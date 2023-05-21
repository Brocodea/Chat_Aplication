//importing

//const express=require("express");
import express from 'express'
import mongoose from 'mongoose'
import Messages from "./dbMessages.js";
import dbMessages from './dbMessages.js';
import Pusher from 'pusher';
import cors from 'cors';



//app config

const app=express()
const port=9000;

const pusher = new Pusher({
    appId: "1591150",
    key: "cd118c73acbcfc70b4f6",
    secret: "152f26dd2bd4801e226f",
    cluster: "ap2",
    useTLS: true
  });


//middleware
app.use(express.json())
app.use(cors())


//db config
const connection_url = 'mongodb+srv://databaseuser:user4001@cluster0.9kvc6eq.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(connection_url,{
    
    useNewUrlParser:true,
    useUnifiedTopology:true
    
});

const db=mongoose.connection;


db.once("open",()=>{
console.log("DB connected");

const msgCollection = db.collection("messagecontents");
const changeStream = msgCollection.watch();


changeStream.on("change",(change)=>{
    console.log("a change",change);

    if(change.operationType === "insert") {
        const messageDetails = change.fullDocument;
        pusher.trigger("messages", "inserted", {
            name: messageDetails.name,
            message:messageDetails.message, 
            message:messageDetails.timestamp,
            received:messageDetails.received,
        });
    }
    else {
        console.log("error triggering pusher");
    }
});
});
//??

//api
app.get("/",(req,res)=>{
    res.status(200).send("hello world")
});

app.get('/messages/sync',(req,res)=>{
    const dbMessage=req.body
    Messages.find(dbMessage).then((data)=>res.status(200).send(data)).catch((err)=>res.status(500).send("error:"+err));
})


// for the post the data to mongodb
app.post("/messages/new",(req,res)=>{
    const dbMessage=req.body
    Messages.create(dbMessage).then((data)=>res.status(201).send(data)).catch((err)=>res.status(500).send("Error:"+err));

})
 
//lisner

app.listen(port,()=>console.log(`listening localhost:${port}`));