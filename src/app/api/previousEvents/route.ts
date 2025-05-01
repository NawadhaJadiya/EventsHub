import Event from '@/models/eventModel'
import {connect} from '@/dbConfig/dbConfig'
import { NextResponse } from 'next/server'

export async function GET(){
    console.log('previous events')
    try {
        connect()
        const now = new Date();

        const previousEvents = await Event.find({endDate : {$lt: now}});
        console.log(previousEvents);
        return NextResponse.json({events : previousEvents}, {status : 200})
    } catch (error : any) {
        console.log('failed to fetch')
        return NextResponse.json({message : 'some error occured'}, {status : 500})
    }
}