'use client';
import { getDirectDriveImageUrl } from "@/helper/getDirectDriveImageUrl";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { EventTypes } from '../types';
// const url : any = getDirectDriveImageUrl("https://drive.google.com/file/d/1SebuSAsiJoparbARJ3z2lOLhq6VpYHmj/view");
const EventList = () => {
  const router = useRouter();
  
  const [events, setEvents] = useState<EventTypes[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch('/api/getEvents');
      const data = await res.json();
      setEvents(data.events);
    };

    fetchEvents();
  }, []);

  // Use `events` as usual below


  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => {
          const directUrl : any= getDirectDriveImageUrl(event.image);
          return (
          <div
            key={event._id}
            className="bg-secondary rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl group"
            onClick={() => {
              localStorage.setItem('selectedEvent', JSON.stringify(event));
              router.push(`/events/id=${event._id}`);
            }}
          >
            <div className="relative">
              <img
                src={directUrl}
                alt={event.name}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary to-transparent opacity-60"></div>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors">{event.name}</h2>
              <p className="text-gray-400 mb-4 line-clamp-2">{event.description}</p>

              <div className="space-y-2">
                <div className="flex items-center text-gray-400 group-hover:text-accent transition-colors">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center text-gray-400 group-hover:text-accent transition-colors">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{event.location}</span>
                </div>

                <div className="flex items-center text-gray-400 group-hover:text-accent transition-colors">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>Register by {new Date(event.deadline).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        )})}
      </div>
    </div>
  );
};

export default EventList;