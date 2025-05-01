import { connect } from '@/dbConfig/dbConfig';
import { NextResponse } from 'next/server';
import Event from '@/models/eventModel';

export async function GET() {
  try {
    await connect();
    const now = new Date();
    const upcomingEvents = await Event.find({ date: { $gt: now } });
    return NextResponse.json({ events: upcomingEvents }, { status: 200 });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}
