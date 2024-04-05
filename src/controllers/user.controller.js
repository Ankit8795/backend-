
import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler( async (req, res)=> {
    //   get user detail from frontend
    // validation - not empty
    //check if user alredy exist : username and email
    //check for image and avtar
    // upload them to cloudinary,avtar 
    //create user object - create entry in db
    // remove password and refersh token filed from response
    // check for creation 
    //return res

 const {fullName, email , username , password} =req.body
     
 if(
    [fullName, email , username , password].some((field)=> field?.trim() === "")
 ){
    throw new ApiError(400, "all field are  required")

 }

const existedUser = User.findOne({
    $or:[{username}, {email}]
})

if(existedUser){
    throw new ApiError(409, "User with email or username alredy exist")
}

const avatarlocalpath = req.files?.avatar[0]?.path;
const coverImagelocalpath = req.files?.coverImage[0]?.path;

if(!avatarlocalpath){
    throw new ApiError(400, "avatar is required")
}


 const avatar = await uploadOnCloudinary(avatarlocalpath)
 const coverImage = await uploadOnCloudinary(coverImagelocalpath)

  if(!avatar){
    throw new ApiError(400, "avatar is required")
  }

  const user = await User.create({

    fullName,
    avatar:avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()

   })

  const createduser =  await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if(!createduser){
    throw new ApiError(500, "error while registring the user")
  }


  return res.status(201).json(
    new ApiResponse(200, createduser, "user registered succesfully")
  )


})

export {registerUser}