import express from "express"
import {port,mongoDBURL} from "./config.js"
import mongoose from "mongoose";
import router from "./routes/routes.js";
import cors from "cors"

const app = express();

app.use(express.json());

app.use(cors({
    origin:"http://localhost:3000/",
    methods:["GET","POST","UPDATE","DELETE"],
    allowedHeaders:["Content-Type"]
}))

app.get("/",(req,res)=>{
    console.log(req);
    res.send("Server Started");
})

app.use("/studentinfo",router)


mongoose
.connect(mongoDBURL)
.then(()=>{

    console.log("Data base is connected")
    app.listen(port,()=>{
        console.log("app listining on port",port);
    })
    

})
.catch((error)=>{
    console.log(error)
})