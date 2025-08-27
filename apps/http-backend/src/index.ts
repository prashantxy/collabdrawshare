import express from "express"
import jwt from "jsonwebtoken"
import  {middleware } from "./middleware.js";
import {JWT_SECRET} from "@repo/backend-common/config"
import {CreateUserSchema,SigninSchema,CreateRoomSchema} from "@repo/common/types"
import cors from "cors"
import { prismaClient } from "@repo/db/client";

const app = express();

app.use(express.json());
app.use(cors());

app.post("/signup",async (req,res)=>{
   const parsedData = CreateUserSchema.safeParse(req.body);
   if(!parsedData.success){
    console.log(parsedData.error);
     res.json({
        message:"Incorrect inputs"
    })
    return;
   }
   try{
    const user = await prismaClient.user.create({
      data:{
        email:parsedData.data?.username,
        //hashing pw
        password:parsedData.data.password,
        name:parsedData.data.name
      }
    })
    res.json({
      userId:user.id
    })
   }
   catch(e){
    res.status(411).json({
      message:"User already exists with this username"
    })
   }
})

app.post("signin" ,async (req,res)=>{
    const parsedData = SigninSchema.safeParse(req.body);
   if(!parsedData.success){
    console.log(parsedData.error);
     res.json({
        message:"Incorrect inputs"
    })
    return;
  }
    const user = await prismaClient.user.findfirst({
      where:{
        email:parsedData.data.username,
        password:parsedData.data.password
      }
    })
    if(!user){
      res.status(403).json({
        message:"Not Authorized"
      })
      return;
    }
    const token = jwt.sign({
     userId:user?.id
    },JWT_SECRET);
    res.json({
        token
    })
})

app.post("/room",middleware,async (req,res)=>{
     const parsedData = CreateRoomSchema.safeParse(req.body);

   if(!parsedData.success){
    console.log(parsedData.error);
     res.json({
        message:"Incorrect inputs"
    })
    return;
   }
    
 // @ts-ignore: TODO: Fix this
    const userId = req.userId;
    try{
      const room = await prismaClient.room.create({
        data:{
          slug:parsedData.data.name, //name = slug
          adminId:userId
        }
      })
      res.json({
            roomId: room.id
        })
    }
    catch(e){
      res.status(411).json({
        message:"User room already exists with this userId"
      })
    }
})

 app.get("/chats/:roomId", async (req,res)=>{
     const roomId = Number(req.params.roomId);
     const messages = await prismaClient.room.findMany({
      where:{
        id:roomId
      },
      orderBy:{
        id : "desc"
      },
      take :50
     });
     res.json({
      messages
    })
  })

   app.get("/room/:slug", async (req,res)=>{
     const slug= req.params.slug;
     const room = await prismaClient.room.findFirst({
      where:{
       slug
      }
     });
     res.json({
      room
    })
  })

app.listen(3000);
