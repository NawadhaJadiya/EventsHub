import mongoose, { Mongoose } from 'mongoose';
import { emit } from 'process';

const adminSchema = new mongoose.Schema({
    
    email : {
        type : String, 
        required : true,
        unique: true,
    },
    
    password : {
        type : String,
        required : true
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    my_events: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event"
        }
    ]
});

const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

export default Admin;