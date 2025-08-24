import express from "express"
import jwt from "jsonwebtoken"
import { middleware } from "./middleware";

const app = express();
app.use(express.json());

app.post("/signup",(req,res)=>{
   res.json({
    userId : 1
   })
})
const JWT_SECRET = "Your_key";
app.post("signin" ,(req,res)=>{
    const userId = 1;
    const token = jwt.sign({
     userId
    },JWT_SECRET);
    res.json({
        token
    })
})

app.post("/room",middleware,(req,res)=>{

    //db call
    
   res.json({
    roomId:123
   })
})

app.listen(3000);
