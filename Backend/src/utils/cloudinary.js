import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

// console.log(process.env.CLOUD_NAME);
// console.log(process.env.API_KEY);
// console.log(process.env.API_SECRET);


// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


export const uploadOnCloudinary = async (localFilePath) => {
    try {
        console.log("localFilePath : ", localFilePath)
        console.log('I am in uploadOnCloudinary');

        if (!localFilePath) {
            return null
        }

        //upload file on cloudinay
        const result = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })

        // delete file from local uploads/cars folder
        fs.unlinkSync(localFilePath);

        //file uploaded seccessfully
        console.log("file upload on cloudinary")
        return result;

    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        return null
    }
}

export const deleteOnCloudinary = async (publicId) => {

    try {
        if (!publicId) {
            return null
        }

        console.log(publicId)

        const result = await cloudinary.uploader.destroy(publicId, { resource_type: "auto" });

        console.log("file delete on cloudinary")
        return result;

    } catch (error) {
        console.error("Error deleting from Cloudinary:", error);
        throw new Error(`Failed to delete file: ${error.message}`);
    }
}
