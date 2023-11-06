// const isProduction = process.env.NODE_ENV === "production";
// const serverUrl = isProduction
//   ? process.env.NEXT_PUBLIC_SERVER_URL
//   : "http://localhost:3000";

export const uploadImage = async (imagePath: string) => {
  try {
    const res = await fetch(`/api/img-upload`, {
      method: "POST",
      body: JSON.stringify({ path: imagePath }),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
