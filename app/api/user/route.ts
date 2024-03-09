import connectDB from "@/lib/connectdb";
import members from "@/models/members";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:Request, res:NextResponse){
    const data = await req.json();
    console.log('data',data);

    await connectDB()

    try {
        console.log(data.params);
        
        const res = await members.findById(data.params);
        // const res = await members.findOne({_id:data.params});
        console.log("response is ",res);
        
        return Response.json({data:res}, {status:200});
    } catch (error) {
        return Response.json({error:'No user',}, {status:400});
    }
    
    return Response.json({});
}

export default {POST}