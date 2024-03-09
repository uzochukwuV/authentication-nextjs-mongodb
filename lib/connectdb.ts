import mongoose from 'mongoose';

declare global {
    var mongoose: any;
}

const MONGODB_URI = process.env.MONGODB_URI!;

if(!MONGODB_URI){
    throw new Error(
        "Please define the MONGODB_URI in your env varaible in .env.local file"
    );
}

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = {conn: null, promise: null};
}

async function connectDB() {
    // check if there is connection already then return the connection
    if(cached.conn){
        return cached.conn
    }
    // if no connection then try connecting and storing the promise in cached.promise
    if(!cached.promise){
        const opts ={
            bufferCommands : false,
        }
        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose)=> mongoose)


    }

    try {
        cached.conn = await cached.promise;
    }catch(e){
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default connectDB;