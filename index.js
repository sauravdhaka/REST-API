const express = require('express')
const mongoose = require('mongoose')
const userRouter = require('./Routes/User')



const app = express()
app.get('/',(req,res)=>{
    res.json('HELLO')
})
app.use(express.json());

app.use('/user',userRouter.router)

async function main() {
    await mongoose.connect('mongodb+srv://sauravdhaka456:saurav19145@cluster0.4jawenj.mongodb.net/');
    console.log("database connected");
  }

main().catch((err) => console.log(err));

app.listen(5000,()=>{
    console.log('server is listing on port : 5000')
})