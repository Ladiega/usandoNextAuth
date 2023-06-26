import {NextResponse} from "next/server";
import User from "@/models/user";
import bcrypt from 'bcryptjs'
import { connectDB } from "@/libs/mongodb";

export async function  POST( request:Request) {
   const {fullname, email, password} = await request.json()
   console.log(fullname, email, password)
    if (!password || password.length < 6) 
    return NextResponse.json(
      {
      message:'Pasword must be at least 6 characters'
    },
    {
      status:400, 
    }
    );
    
    try {
      //throw new Error('my custom error!')
      await connectDB()
      const userFound = await User.findOne({email})
    if (userFound){
      return NextResponse.json({
        message:"Email alredy exist"
      },{
        status:409 
      })
    };
   const hasedPassword = await bcrypt.hash(password, 12)
    const user = new User({
      email,
      fullname,
      password:hasedPassword,
    });
   const savedUser = await user.save();
   //console.log(savedUser)
   

  return NextResponse.json({
    _id:savedUser.id,
    email:savedUser.email,
    fullname:fullname.fullname,
  });
    } catch (error) {
      console.log(error);
      if(error instanceof Error){
          return NextResponse.json(
        {
          message: error.message,
        },
        {
          status:400,
        }
      );
      }
    
    }
};