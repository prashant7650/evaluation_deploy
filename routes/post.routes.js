const express = require("express");
const {postModel} = require("../model/post.model")

const postRouter = express.Router()

postRouter.get("particular/:id" ,async(req,res)=>{
    try{
        const {userid}=req.body
        const {device=["laptop","tablet","mobile"]}=req.query

        const post =await postModel.find({$and:[{userid},{$device:{$in:device}}]})
        res.send({"msg":"all post"})

    }
    catch(err){
        
        res.send({"msg":err.messaage})
    }

})


postRouter.post("/add", async (req,res) => {
    try{
        const payload=req.body;
        const newpost=new postModel(payload)
        await newpost.save()
        res.send({"msg":"post created",post:newpost})
    }
    catch(err){
        console.log(err)
        res.send({"msg":"error occure"})

    }
   
})
postRouter.get("/top",async(req,res)=>{
    try{
        const data=await postModel.find()
        const max=data.reduce((prev,current)=>{
            return prev.comments > current.comments ? prev:current
        })
        res.send(max)

    }catch(err){
        console.log(err)
        res.send({"msg":"error occure"})
    }
})
postRouter.patch("/update/:id", async (req,res) => {
    try{
        const payload=req.body;
        const id=req.params.id;
        const updatepost=await postModel.findByIdAndUpdate(id,payload)
        res.send({"msg":"post has been update",post:updatepost})
    }
    catch(err){
        console.log(err)
        res.send({"msg":"error occure"})

    }
})

postRouter.delete("/delete/:id", async (req,res) => {
    try{
        const payload=req.body;
        const id=req.params.id;
        const deletepost=await postModel.findByIdAndDelete(id,payload)
        res.send({"msg":"post has been deleted",post:deletepost})
    }
    catch(err){
        console.log(err)
        res.send({"msg":"error occure"})

    }
})

module.exports ={
    postRouter
}