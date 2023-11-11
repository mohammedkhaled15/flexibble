"use server";
import { v2 as cloudinary } from "cloudinary";
import { getCurrentUser } from "@/utils/authOptions";
import prisma from "@/utils/connectDb";
import { ProjectForm, ProjectInterface } from "@/common.types";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const baseUrl = () => {
  return process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "example.com";
};

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
    return newProject;
  } catch (error) {
    console.log(error);
  }
};

//Get All Projects
export const getAllProjects = async (category: string, endCursor: string) => {
  try {
    const projects = await prisma.project.findMany({
      include: { createdBy: true },
    });
    return projects;
    // const res = await fetch(`${baseUrl()}/api/project`, {
    //   method: "GET",
    // });
    // return res.json();
  } catch (error) {
    console.log(error);
  }
};

//Get Project By its ID
export const getProjectById = async (id: string) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id },
      include: { createdBy: true },
    });
    return project;
    // const res = await fetch(`${baseUrl()}/api/project/?id=${id}`, {
    //   method: "GET",
    // });
    // return res.json();
  } catch (error) {
    console.log(error);
  }
};

//Get user full profile
export const getUserFullProfile = async (id: string) => {
  try {
    const userProfile = await prisma.user.findUnique({
      where: { id },
      include: { projects: { include: { createdBy: true } } },
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
    return res
  } catch (error) {
    console.log(error);
  }
};
