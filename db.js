const mongoose =require("mongoose")

const connection=mongoose.connect("mongodb+srv://prashant:prashantxyz@cluster0.yck3mc0.mongodb.net/PostAPI?retryWrites=true&w=majority");

module.exports={
    connection
}