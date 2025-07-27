import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        resquired:true
    },
     receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        resquired:true
    },
    message:{
        type:String,
        required:true,
    }
},{timestamps:true})

const messageModel = mongoose.models.Message || mongoose.model('Message',messageSchema)

export default messageModel