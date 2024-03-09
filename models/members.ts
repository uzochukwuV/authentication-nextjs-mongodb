import mongoose, { Mongoose } from "mongoose";

interface Members extends mongoose.Document {
    name: String;
    email: String;
    password: String;
    image: String;
    isAdmin: boolean
    likes: String[];
    age: number;
}



const MemberSchema = new mongoose.Schema<Members>({
    name: {
        type: String,
        required: [true, 'Please provide a name for this User'],
        maxlength: [60, "Name cannot be more than 60 letters"]
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        maxlength: [60, "Name cannot be more than 60 letters"]
    },
    password: {
        type: String,
        required: [true, "Please provide a passord"],
    },
    image: {
        default:'',
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    likes: {
        type: [String],

    },
    age: {
        default: 4,
        type: Number,

    }


});


export default mongoose.models.Members || mongoose.model<Members>('Members', MemberSchema);