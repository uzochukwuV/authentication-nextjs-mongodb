
import connectDB from "@/lib/connectdb";
import members from "@/models/members";
import { NextApiRequest } from "next";
import { cookies } from "next/headers";


export async function POST(req:Request){
    const cookieStore = cookies();
    
    const {email, password} = await req.json();
    console.log(email);
    
    await connectDB()

    try {
        const user =await members.findOne({email})
        if(!user){
            return Response.json({error:"No user found", status:"error"}, {status:400});
        }
        cookieStore.set('id',user._id)
        return Response.json({data:user, status:'success'}, {status:200});
    } catch (error) {
        return Response.json({error:"cant log in", status: 'error'}, {status:402});
    }

}

export async function GET(res:Response){
    const data = 'hio daer';
    return Response.json({'user': "user"})
}

export default {GET, POST}

