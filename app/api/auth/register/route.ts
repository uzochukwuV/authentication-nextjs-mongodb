
import connectDB from "@/lib/connectdb";
import members from "@/models/members";
import { NextApiRequest } from "next";


export async function POST(req:Request){
    
    const data = await req.json();
    console.log(data.email, data);
    
    await connectDB()

    const member = await members.findOne({email:data.email});
    console.log(member);
    

    if(member){
        return Response.json({"error":"user with tjis email is already registered"}, {status: 401})
    }

    try {
        const newMember = await members.create(data);
        
        
        return Response.json({status: "success", data: newMember}, {status: 201})
    } catch (error) {
        return Response.json({"error":error}, {status: 400})
    }

}

export async function GET(res:Response){
    const data = 'hio daer';
    return Response.json({'user': "user"})
}

export default {GET, POST}

