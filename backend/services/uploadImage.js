const multer = require("multer");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const memoryStorage = multer.memoryStorage();
const upload = multer({
  storage: memoryStorage,
});

const uploadToCloudinary = async (fileString, format) => {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        folder: "talk-that-talk-images",
        upload_preset: "talk-that-talk-images-preset",
      },
      process.env.CLOUDINARY_API_SECRET || ""
    );
    const res = await cloudinary.uploader.upload(
      `data:image/${format};base64,${fileString}`,
      {
        folder: "talk-that-talk-images",
        upload_preset: "talk-that-talk-images-preset",
        api_key: process.env.CLOUDINARY_API_KEY,
        timestamp,
        signature,
      }
    );
    const { secure_url: imageUrl } = res;
    return imageUrl;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};

module.exports = {
  upload,
  uploadToCloudinary,
};
