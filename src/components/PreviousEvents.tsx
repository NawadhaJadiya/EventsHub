'use client';

import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import { EventTypes } from '../types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState , useEffect} from 'react';
import axios from 'axios';
import { getDirectDriveImageUrl } from "@/helper/getDirectDriveImageUrl";


const PreviousEvents = () => {
  
  const router = useRouter;
  const [events, setEvents] = useState<EventTypes[]>([]);

  useEffect(() => {
    const fetchPreviousEvents = async() => {
      const res = await fetch('/api/previousEvents');
      const data = await res.json();
      console.log(data.events, 'these are the previous events');
      setEvents(data.events);
    };

    fetchPreviousEvents();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Previous Events</h1>
      <div className="space-y-8">
        {events.map((event) => {
          const directUrl : any= getDirectDriveImageUrl(event.image);
          return (
          <div key={event._id} className="bg-black rounded-lg shadow-md overflow-hidden">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-1">
                <img
                  src={directUrl}
                  alt={event.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="col-span-2 p-6">
                <h2 className="text-2xl font-semibold text-white mb-4">{event.name}</h2>
                <p className="text-gray-500 mb-6">{event.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-gray-500">
                    <Calendar className="w-5 h-5 mr-2" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{event.location}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Event Highlights</h3>
                  <ul className="list-disc list-inside text-gray-500">
                    <li>Over 500 attendees from various tech companies</li>
                    <li>20+ speakers sharing industry insights</li>
                    <li>Interactive workshops and networking sessions</li>
                  </ul>

                  <Link
                    href={`/events/${event._id}/gallery`}
                    className="inline-flex items-center text-red-500 hover:text-white font-semibold"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Photo Gallery
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )})}
      </div>
    </div>
  );
};

export default PreviousEvents;