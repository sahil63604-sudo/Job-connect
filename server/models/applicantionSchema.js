const mongoose = require("mongoose");

const Application = mongoose.Schema({
    applicant :{
        type:mongoose.Types.ObjectId,
        ref:'UserSchema',
        required:true
    },
    job :{
        type:mongoose.Types.ObjectId,
        ref:'jobSchemas',
        required:true
    },
    status:{
        type:String,
        enum:['applied','interview','accepted','rejected'],
        default:'applied',
    },

},
{
    timestamps: true
}
);
module.exports=mongoose.model('Application',Application)