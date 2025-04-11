'use client';

import { useRouter } from 'next/navigation';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { Event } from '../types';

const EventList = () => {
  const router = useRouter();
  
  // This would come from your API/state management
  const events: Event[] = [
    {
      id: '1',
      title: 'Tech Conference 2024',
      description: 'Annual technology conference featuring the latest innovations',
      date: '2024-04-15',
      location: 'Convention Center',
      imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80',
      registrationDeadline: '2024-04-01',
      organizer: 'Tech Events Inc',
      status: 'upcoming'
    },
    {
      id: '2',
      title: 'Startup Summit',
      description: 'Connect with entrepreneurs and investors',
      date: '2024-05-20',
      location: 'Innovation Hub',
      imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80',
      registrationDeadline: '2024-05-10',
      organizer: 'Startup Network',
      status: 'upcoming'
    }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-secondary rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl group"
            onClick={() => router.push(`/events/${event.id}`)}
          >
            <div className="relative">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary to-transparent opacity-60"></div>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors">{event.title}</h2>
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
                  <span>Register by {new Date(event.registrationDeadline).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;