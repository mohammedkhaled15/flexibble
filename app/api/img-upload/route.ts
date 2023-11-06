import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (request: Request, response: Response) => {
  const { path } = await request.json();
  if (!path)
    return NextResponse.json(
      { message: "Image Path is required" },
      { status: 400 }
    );
  try {
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      transformation: [{ width: 1000, height: 752, crop: "scale" }],
    };

    const res = await cloudinary.uploader.upload(path, options);
    console.log(res);
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
