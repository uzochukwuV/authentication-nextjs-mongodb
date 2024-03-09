import connectDB from "@/lib/connectdb"
import members from "@/models/members"

export async function GET(res:Response){
    await connectDB()

    try {
        const allmembers = await members.find({})
        return Response.json({data:allmembers, status:'success'})
    } catch (error) {
        return Response.json({'error': "cant get users", status:"error"})
    }
    
}

export default {GET}