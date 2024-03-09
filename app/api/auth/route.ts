



export async function POST(){

    return Response.json({'user': "user"})
}

export async function GET(res:Response){
    const data = 'hio daer';
    return Response.json({'user': "user"})
}

export default {GET, POST}