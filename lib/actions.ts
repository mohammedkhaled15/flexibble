const baseUrl = () => {
  return process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "example.com";
};

export const uploadImage = async (imagePath: string) => {
  try {
    const res = await fetch(`${baseUrl()}/api/img-upload`, {
      method: "POST",
      body: JSON.stringify({ path: imagePath }),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getAllProjects = async (categort: string, endCursor: string) => {
  try {
    const res = await fetch(`${baseUrl()}/api/projects`, {
      method: "GET",
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
