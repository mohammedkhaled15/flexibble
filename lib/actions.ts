"use server";

import { v2 as cloudinary } from "cloudinary";
import { getCurrentUser } from "@/utils/authOptions";
import prisma from "@/utils/connectDb";
import { ProjectForm } from "@/common.types";
import { revalidatePath } from "next/cache";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Upload Image
export const uploadImage = async (imagePath: string) => {
  const session = await getCurrentUser();
  if (!session || !imagePath) return;
  try {
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      transformation: [{ width: 1000, height: 752, crop: "scale" }],
    };
    const res = await cloudinary.uploader.upload(imagePath, options);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//Create Project
export const createProject = async (image: string, formObject: ProjectForm) => {
  const session = await getCurrentUser();
  if (!session) return;
  try {
    const imgUrl = await uploadImage(image);
    if (!imgUrl) return;
    const newProject = await prisma.project.create({
      data: { ...formObject, image: imgUrl.url, userEmail: session.user.email },
    });
    if (newProject) revalidatePath("/");
    return newProject;
  } catch (error) {
    console.log(error);
  }
};

//Get All Projects
export const getAllProjects = async (
  category?: string | null,
  take?: string
) => {
  try {
    let projects;
    if (category === "All") {
      projects = await prisma.project.findMany({
        take: Number(take) || 8,
        include: { createdBy: true, likedBy: true },
      });
    } else {
      projects = await prisma.project.findMany({
        take: Number(take) || 8,
        where: { ...(category && { category }) },
        include: { createdBy: true, likedBy: true },
      });
    }
    return projects;
  } catch (error) {
    console.log(error);
  }
};

//Get All Projects Length
export const getAllProjectsLength = async (category?: string | null) => {
  try {
    let projectsLength;
    if (category === "All") {
      projectsLength = await prisma.project.count();
    } else {
      projectsLength = await prisma.project.count({
        where: { ...(category && { category }) },
      });
    }
    return projectsLength;
  } catch (error) {
    console.log(error);
  }
};

//Get Project By its ID
export const getProjectById = async (id: string) => {
  try {
    const project = await prisma.project.update({
      where: { id },
      data: { views: { increment: 1 } },
      include: { createdBy: true },
    });
    if (project) revalidatePath("/");
    return project;
  } catch (error) {
    console.log(error);
  }
};

//Get user full profile By Id
export const getUserFullProfile = async (id: string) => {
  try {
    const userProfile = await prisma.user.findUnique({
      where: { id },
      include: { projects: { include: { createdBy: true } }, likedProjects:true },
    });
    return userProfile;
  } catch (error) {
    console.log(error);
  }
};

//Delete Project
export const deleteProject = async (projectId: string) => {
  const session = await getCurrentUser();
  if (!session) return;
  try {
    const res = await prisma.project.delete({ where: { id: projectId } });
    revalidatePath("/");
    return res;
  } catch (error) {
    console.log(error);
  }
};

//Edit Project
export const UpdateProject = async (
  projectId: string,
  formObject: ProjectForm
) => {
  const session = await getCurrentUser();
  if (!session) return;
  //check if user uploaded a new image or not by checking the pattern of form.image if it base64 data url then it changed
  function isBase64DataURL(str: string) {
    const base64DataURLPattern = /^data:image\/[a-zA-Z]+;base64,([^\s]+)$/;
    return base64DataURLPattern.test(str);
  }
  let newFormObject = { ...formObject };
  if (isBase64DataURL(formObject.image)) {
    const imgUrl = await uploadImage(formObject.image);
    if (imgUrl) {
      newFormObject = {
        ...formObject,
        image: imgUrl.url,
      };
    }
  }
  try {
    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: { ...newFormObject },
    });
    // console.log(formObject)
    revalidatePath("/");
    return updatedProject;
  } catch (error) {
    console.log(error);
  }
};

//Like a project
export const likeProject = async (projectId: string) => {
  const session = await getCurrentUser();
  if (!session) return;

  try {
    const userProfile = await getUserFullProfile(session.user.id)
    const likedProjectsIds = userProfile?.likedProjects.map(
      (like) => like.projectId
    );
    if (!likedProjectsIds?.includes(projectId)) {
      const res = await prisma.like.create({
        data: { userId: session.user.id, projectId },
      });
    } else {
      const res = await prisma.like.deleteMany({
        where: { projectId, userId: userProfile?.id },
      });
    }
  } catch (err) {
    console.log(err);
  }finally{
    console.log("revalidate")
    revalidatePath("/")
  }
};
