import {connect} from '@/dbConfig/dbConfig';
import { NextResponse, NextRequest } from 'next/server';
import mongoose from 'mongoose';
import Event from '@/models/eventModel'

export async function PUT(request : NextRequest){
    try {
        await connect();
        const req = await request.json();
        const {id , decoded} = req

        const event = await Event.findById(id);
        if(!event){
            return NextResponse.json({message : 'No event'}, { status: 404 });
        } 

        // Convert the decoded string to ObjectId for comparison
        let decodedObjectId;
        try {
            decodedObjectId = new mongoose.Types.ObjectId(decoded.trim());
        } catch (error) {
            return NextResponse.json({ message: 'Invalid user ID format' }, { status: 400 });
        }

        const participant = event.participants.find(
            (p: any) => p.user.equals(decodedObjectId)
        );

        if (!participant) {
            return NextResponse.json({ message: 'User not registered for this event' }, { status: 404 });
        }

        participant.attended = true;
        await event.save(); 
      
        return NextResponse.json({ message: 'Check-in successful', participant }, { status: 200 });
      
    } catch (error) {
        console.error('Error in PUT /check-in:', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}