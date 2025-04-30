const express=require('express');


const app=express();

app.use("/new",(req,res)=>{
  res.send('Hello World from Arun kumar!');
})

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});