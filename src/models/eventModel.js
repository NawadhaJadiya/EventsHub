import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true,
    },
    description : {
        type : String,
        required : true
    },
    adminId: {
         type: mongoose.Schema.Types.ObjectId, 
         ref: "admin", 
         required: true 
    },
    organizer : {type : String, required : true},
    maxParticipants : {
        type : Number
    },
    date : {
        type : Date,
        required : true
    },
    deadline : {
        type : Date,
        required : true,
    },
    category: { 
        type: String,
        required : true
    },
    location : { type : String, required : true },
    endDate : {
        type : Date
    },
    time : {
        type : String,
        required : true
    },
    guests : {
        type : [String],
    },
    
    image : {
        type : String,
        required : true,
    },
    participants: {
        type: [
          {
            user: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
              required: true
            },
            registeredAt: {
              type: Date,
              default: Date.now
            },
            attended : {
                type : Boolean,
                default: false
            }
          }
        ],
    },
}
);

const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);

export default Event;