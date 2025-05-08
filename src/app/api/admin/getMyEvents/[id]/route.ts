import {connect} from '@/dbConfig/dbConfig';
import { NextResponse, NextRequest } from 'next/server';
import Admin from '@/models/adminModel'
import { request } from 'http';
import Event from '@/models/eventModel'
import { EventTypes } from '@/types';

export async function GET(req : NextRequest, { params} : {params : {id : string}}){
    console.log('this my event API route hit')
    try {

        await connect();
        const adminId = params.id;
        console.log('this is the admin Id received in the backend', adminId)
        const admin = await Admin.findById(adminId);
        if (!admin) {
            console.log('admin not found');
            return NextResponse.json({ error: 'admin not found' }, { status: 404 });
        }
        const events : EventTypes[] = [];
        
        for(var i = 0; i < admin.my_events.length; i++){
            const eventId = admin.my_events[i];
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