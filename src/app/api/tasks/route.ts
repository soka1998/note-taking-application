import taskModel from "../../../../models/taskShcema";
import { NextResponse , NextRequest } from "next/server";
import connectMongoDB from "../../../../libs/connectdb";


export const GET = async (request: NextRequest) => {
    await connectMongoDB()
    try {
      const query = request.nextUrl.searchParams.get("query") 
      const Data:any = query ? await taskModel.where("title",query) : await taskModel.find()
      return NextResponse.json(Data)
    } catch (error) {
      return new NextResponse("Error Fetching Data" + error)
    }
  }

export async function POST(request: Request) {
    await connectMongoDB();
    try {
        const {title , description} = await request.json();
        const updatedTask = await taskModel.create({title, description})
        if(!updatedTask){
            throw new Error ("Task not Found")
        }
        return NextResponse.json({message : "Task created"} , {status: 201})
    } catch (error) {
        return NextResponse.json({message : error} , {status :500})
    }
    
}