const validator=require("validator");

const validatorSignup=(req)=>{
    const {firstName,email,password}=req.body;

    if(!firstName){
        throw new Error("type the correct name");
    }
    else if(!validator.isEmail(email)){
        throw new Error("type the correct email");
    }
    else if(!validator.isStrongPassword(password))
    {
        throw new Error("type the correct password");
    }
}
const validateEditFields=(req)=>
{
   const allowedData=["firstName","email","about"];
  const isedit= Object.keys(req.body).every(field=>allowedData.includes(field));
   return isedit;
}

const validatePassword = (req) => {
    const allowedFields = ["password"];
    const isValid = Object.keys(req.body).every(field => allowedFields.includes(field));
    if (!isValid || !req.body.password || req.body.password.length < 6) {
      throw new Error("Invalid password field or too short");
    }
    return true;
  };
  

module.exports={
    validatorSignup,
    validateEditFields,
    validatePassword 
};