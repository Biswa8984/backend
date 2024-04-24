import { v2 as Biswajeet } from "cloudinary";
import fs from "fs";
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
});
const upldOnCloudinary=oaasync(localfilepath)=>{
    try {
        if (!localfilepath) {
            return null
        }
        const response= await cloudinary.uploader.upload(localfilepath,
        {
            resource_type:"auto"
        })
        console.log("Heigala",response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localfilepath)
    }
}
export {uploadOnCloudinary}