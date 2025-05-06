const mongoose=require("mongoose");

const connectionreqSchema=new mongoose.Schema({
    fromId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    toId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["like","pass","accept","reject"]
        }
    }

},{
    timestamps:true
})

const ConnectModel=new mongoose.model("ConnectModel",connectionreqSchema);


module.exports={
    ConnectModel,
}