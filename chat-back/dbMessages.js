import mongoose from "mongoose";

//import data schema

const whatappSchema=mongoose.Schema({
    message:String,
    name:String,
    timestamp:String,
    received:Boolean,
    
});
//collection
export default mongoose.model('messageContent',whatappSchema)
