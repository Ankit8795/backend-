import connectDB from "./db/index.js";
import dotenv from "dotenv"
import { app } from "./app.js";

dotenv.config({
    path : './env'
})
connectDB()
.then(()=>{
   app.listen(process.env.PORT || 8000, ()=>{

    console.log(`server is runnig on port ${process.env.PORT} `)

   }
          
    ) 


})
.catch((err) =>{

    console.log(`error occured in mongodb connection ${err}`)

})

