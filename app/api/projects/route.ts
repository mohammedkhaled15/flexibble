import prisma from "@/utils/connectDb";
import { getCurrentUser } from "@/utils/authOptions";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: Response) => {
  const session = await getCurrentUser();
  if (!session) {
    return NextResponse.json({ message: "Not Allowed Entry" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const project = await prisma.project.create({
      data: {
        ...body,
        userEmail: session.user.email,
      },
    });
    console.log(project);
    return NextResponse.json({ project }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const GET = async (req: Request, res: Response) => {
  // const session = await getCurrentUser();
  try {
    const projects = await prisma.project.findMany({
      include: { createdBy: true },
    });
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
