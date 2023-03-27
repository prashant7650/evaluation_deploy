const express=require("express")
const {connection}=require("./db")
const {userRoute}=require("./routes/user.routes")
const {postRouter}=require("./routes/post.routes")
const {authenticate}=require("./middleware/authenticate.middleware")

const app=express()
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.use("/users",userRoute)
app.use(authenticate)
app.use("/posts",postRouter)


app.listen(2222,async()=>{
    try{
        await connection
        console.log("connected to db")

    }catch(err){
        console.log(err)
        console.log("cannot connecte do db")
    }
    console.log("server is running at port 2222")
})