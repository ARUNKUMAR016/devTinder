const adminAuth=(req,res,next)=>{
    const token="abc";
    const adminAuthen=token==="abc";
    if(!adminAuthen){
      res.status(401).send("unautherized");
    }
    else{
     next();
    }
  }

  const userAuth=(req,res,next)=>{
    const token="abc";
    const userAuthen=token==="abc";
    if(!userAuthen){
      res.status(401).send("unautherized");
    }
    else{
     next();
    }
  }

  module.exports={
    adminAuth,userAuth
  }