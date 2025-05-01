import {connect} from '@/dbConfig/dbConfig';
import { NextResponse, NextRequest } from 'next/server';
import User from '@/models/userModel'
import { request } from 'http';
import Event from '@/models/eventModel'
import { EventTypes } from '@/types';

export async function GET(req : NextRequest, { params} : {params : {id : string}}){
    try {
        await connect();
        const userId = params.id;
        const user = await User.findById(userId);
        if (!user) {
            console.log('User not found');
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        const events : EventTypes[] = [];
        
        for(var i = 0; i < user.events.length; i++){
            const eventId = user.events[i].event;
            var event = await Event.findById(eventId);
            if (event) {
                events.push(event);
            } else {
                console.log('Event not found with ID:', eventId);
            }
        }
        
        return NextResponse.json({ events }, { status: 200 });

    } catch (error : any) {
        console.error('Error in getRegisteredEvents:', error);
        return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
    }
}