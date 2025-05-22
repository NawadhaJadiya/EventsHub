import {connect} from '@/dbConfig/dbConfig';
import { NextResponse, NextRequest } from 'next/server';
import User from '@/models/userModel'
import { request } from 'http';
import Event from '@/models/eventModel'
import { RegistrationTypes } from '@/types';

export async function GET(req : NextRequest, { params} : {params : {id : string}}){
    console.log('this my event API route hit')
    try {

        await connect();
        const eventId = params.id;
        
        const event = await Event.findById(eventId);
        if (!event) {
            console.log('event not found');
            return NextResponse.json({ error: 'event not found' }, { status: 404 });
        }
        const registrations : RegistrationTypes[] = [];
        
        for (let i = 0; i < event.participants.length; i++) {
            
            const { user, registeredAt, attended } = event.participants[i];
        
            
            const userData = await User.findById(event.participants[i].user)
            
            if (userData) {
              
              const registrationData: RegistrationTypes = {
                time: registeredAt,
                name: userData.name,
                phoneNumber: userData.phoneNumber,
                email: userData.email,
                enrollmentNumber: userData.enrollmentNumber,
                year: userData.admissionYear,
                course: userData.course,
                branch: userData.branch_specialization,
                attended: attended
              };
        
              registrations.push(registrationData); // Add to the events array
            }}
        
        return NextResponse.json({ registrations }, { status: 200 });

    } catch (error : any) {
        console.error('Error in getRegisteredParticipants:', error);
        return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
    }
}