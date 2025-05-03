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


module.exports={
    validatorSignup,
};