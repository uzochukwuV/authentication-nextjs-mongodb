import connectDB from "@/lib/connectdb";
import members from "@/models/members";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:Request, res:NextResponse){
    const data = await req.json();
    console.log('data',data);

    await connectDB()

    try {
        console.log(data.id);
        const deletedUser = await members.findByIdAndDelete(data.id)
        // const res = await members.findOne({_id:data.params});
        
        return Response.json({data:deletedUser}, {status:200});
    } catch (error) {
        return Response.json({error:'No user',}, {status:400});
    }
    
    return Response.json({});
}

export default {POST}