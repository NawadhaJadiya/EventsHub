// app/api/users/register/route.ts

import Event from '@/models/eventModel';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';

export async function PUT(request: NextRequest) {

  try {
    const body = await request.json();
    const { eventId, userId } = body;
    
    const result = await Event.findOne({
      _id: eventId,
      'participants.user': userId,
    });

    if(result){
        console.log('user already');
        console.log(result)
        return NextResponse.json({ message: 'User already registered for this event' }, { status: 400 });
    }

    const finalResult = await Event.findOneAndUpdate(
        {_id : eventId},
        {
            $push : {
                participants : {
                    userId: userId
                }
            }
        }
    );

    await User.findOneAndUpdate(
       {_id : userId},
       {
        $push : {
          events : {
            event : eventId
          }
        }
       }
    );

    

    return NextResponse.json({ message: 'Success', eventId, userId}, {status : 200});
  } catch (error: any) {
    console.error('Error in API:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}


//pass userId from frontend usign api/me
//pass 