import { error } from "console";
import connectMongoDB from "../../../../../libs/connectdb";
import taskModel from "../../../../../models/taskShcema";

import { NextResponse, NextRequest } from "next/server";

export async function PUT(request: NextRequest , {params}:{params: {id :string}}){
    await connectMongoDB();
    try {
        const {id} = params;
        const {title , description} = await request.json();
        const newTask = await taskModel.findByIdAndUpdate(id ,{ title , description})
        if(!newTask) {
            throw new Error ("Task not found")
        }

        return NextResponse.json({message :'Task updated' , newTask} , {status :200})
        
    } catch (error) {
      return NextResponse.json({message : error} , {status :500})  
    }
}



export async function DELETE(request :NextRequest) {
    await connectMongoDB()
    try{
        const id = request.nextUrl.pathname.split('/').pop(); 
       const deletedTask = await taskModel.findByIdAndDelete(id);
       if(!deletedTask) {
        throw new Error ("Task not found")
       }
        return NextResponse.json({ message: "User deleted" }, { status: 200 });
    }catch(err){
        return NextResponse.json({message : err} , {status : 500})
    }    
}