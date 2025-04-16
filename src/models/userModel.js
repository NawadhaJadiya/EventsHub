import mongoose from 'mongoose';
import { emit } from 'process';

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String, 
        required : true,
        unique: true,
    },
    instituteName : {
        type : String,
        required : true,
    },
    enrollmentNumber : {
        type : String,
        required : true,
        unique : true
    },
    phoneNumber : {
        type : Number,
        required : true,
        unique : true
    },
    course : {
        type : String,
        required : true,
    },
    branch_specialization : {
        type : String,
        required : true,
    },
    admissionYear : {
        type : Number,
        required : true,
    },
    password : {
        type : String,
        required : true
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    forgotPasswordToken : String,
    verifyToken : String,
    forgotPasswordTokenExpiry : Date,
    verifyTokenExpiry : Date,
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;