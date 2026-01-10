export const extractPublicId = (url) => {
  if (!url) return null;

  // Example URL:
  // https://res.cloudinary.com/<cloud>/image/upload/v123/folder/name.png
  const parts = url.split("/");
  const filename = parts.pop().split(".")[0]; // name
  const folder = parts.slice(parts.indexOf("upload") + 1).join("/");

  return `${folder}/${filename}`.replace(/^v\d+\//, "");
};
