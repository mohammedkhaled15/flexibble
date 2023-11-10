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
