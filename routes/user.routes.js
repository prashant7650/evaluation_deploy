const express=require("express")
const {userModel}=require("../model/user.model")

const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

const userRoute=express.Router();

userRoute.post("/register",async(req,res)=>{
    // const {name,email,gender,password,age,city,is_married}=req.body
    try{

        const payload=req.body;
        const user=await userModel.findOne({email:payload.email})

        if(user){
            req.send({"msg":"User is already exist"})
        }else{
            const hashpass=await bcrypt.hashSync(payload.pass,6)
            payload.pass=hashpass

            const newuser=new userModel(payload)
            await newuser.save()
            return res.json({"msg":"new user has been register",user:newuser})
        }
    //    bcrypt.hash(password,5,async(err,hash)=>{
    //     if(err){
    //         res.send({"msg":"something went wrong","err":err.message})
    //     }else{
    //         const user=new userModel({name,email,gender,password,age,city,is_married:hash})
    //         await user.save()
    //         res.send({"msg":"new user has been register"})
            
    //     }
    //    })


    }
    catch(err){
        console.log(err)
        res.send({"msg":"something went wrong","err":err.message})
    }

})
userRoute.post("/login",async(req,res)=>{
    
    try{
        const payload=req.body;
        const user=await userModel.findOne({email:payload.email})
        if(!user){
            return res.send({"msg":"please login first"})
        }

        const correctpass=await bcrypt.compare(
            payload.pass,
            user.pass
        )
        if(correctpass){
            let token=await jwt.sign({email:user.email,userID:user._id},"masai")
            res.send({"msg":"login succes",token})
        }else{
            res.send("invalid")
        }
            

        // const user=await userModel.find({email})
        // console.log(user)
        // if(user.length>0){
        //     bcrypt.compare(password,user[0].password,(err,result)=>{
        //         if(result){
        //             token=jwt.sign({userID:user[0]._id},"masai")
        //             res.send({"msg":"Login succes","token":token})
        //         }else{
        //             res.send("wrong credentials")
        //         }
        //     })
        // }else{
        //     res.send("wrong credential")
        // }

    }catch(err){
        console.log(err)
        res.send({"msg":"something went wrong","err":err.message})
    }
})

module.exports={
    userRoute
}
