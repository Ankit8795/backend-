
import { v2 as cloudinary } from "cloudinary";

 import fs from "fs"



          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.XOvvUjwyLzmAmxYLq5OnTqp7rKg
});


const uploadOnCloudinary = async (localFilePath)=>{

  try{
    if(!localFilePath) return null

   const response = await cloudinary.uploader.upload(localFilePath ,{
      resource_type : "auto"
    }  )

    console.log("file is uploded on cloudinary", response.url);
     
    return response;
  }catch(error){
    fs.unlinkSync(localFilePath)//remove locally saved temparory fie as the uplo9d got failed
    return null;
  
  }

}


cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" }, 
  function(error, result) {console.log(result); });