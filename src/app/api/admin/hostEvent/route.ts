import {connect} from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import Event from '@/models/eventModel';
import Admin from '@/models/adminModel';
import { verifyTokenInMiddleware } from '@/helper/tokenDecode';

export async function POST(request : NextRequest){
    try {
        await connect();
        const req = await request.json();
        const token= request.cookies.get('token')?.value;
        if (!token) {
            return NextResponse.json({ error: "Unauthorized: No token provided" }, { status: 401 });
        }
        const decodedToken = await verifyTokenInMiddleware(token);
        const admin = await Admin.findOne({_id : decodedToken.id});
        var adminName = admin.name
        let {name, 
            description, 
            adminId = decodedToken.id, 
            organizer,
            maxParticipants, 
            date, 
            deadline, 
            category, 
            location, 
            endDate,
            time, 
            guests, 
            image, 
            participants = [],
        } = req;

        endDate = endDate || date;
        console.log(req);
        if (new Date(date) > new Date(endDate)) {
            return NextResponse.json({ error: "Event end date must be after the start date" }, { status: 400 });
        }
        
        if (new Date(deadline) > new Date(date)) {
            return NextResponse.json({ error: "Registration deadline must be before the event date" }, { status: 400 });
        }
        const existingEvent = await Event.findOne({name})
         if(existingEvent){
            return NextResponse.json({
                error : "Event with this name already exists"
            }, {status: 400});
        } 
        
        const newEvent = new Event({
            name, description, adminId, organizer,
            maxParticipants, date, deadline, category, 
            location, endDate,time, guests, image, participants
    });



    const savedEvent = await newEvent.save();

    await Admin.findOneAndUpdate(
       {_id : decodedToken.id},
       {
        $push :{
            my_events : savedEvent._id,
        }
       },
    );

    console.log(savedEvent)
    return NextResponse.json({message : "Event created successfully", 
        event : {
            id : savedEvent._id,
            name : savedEvent.name,
        }
    } , {status : 201})
    } catch (error : any) {
        console.error(`signup error ${error}`);

        if (error.name === 'ValidationError') {
                    return NextResponse.json(
                        { error: error.message },
                        { status: 400 }
                    );
                }
                
                if (error.code === 11000) {
                    return NextResponse.json(
                        { error: "Event with this name already exist" },
                        { status: 400 }
                    );
                }
        
                return NextResponse.json({error : "Internal server error"}, {status : 500})
    }
}