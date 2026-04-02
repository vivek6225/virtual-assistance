import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

//  configure once
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (filepath) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(filepath);

    // delete local file after upload
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    return uploadResult.secure_url;

  } catch (error) {
    // delete file if error
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    console.log("Cloudinary Error:", error);
    return null;
  }
};

export default uploadOnCloudinary;