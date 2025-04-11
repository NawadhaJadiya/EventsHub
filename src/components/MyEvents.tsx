'use client';

import { Calendar, MapPin, Clock, Users, Link as LinkIcon } from 'lucide-react';
import { Event } from '../types';
import Link from 'next/link';

const MyEvents = () => {
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
    }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">My Events</h1>
      <div className="space-y-6">
        {events.map((event) => (
          <div key={event.id} className="bg-secondary rounded-lg shadow-md p-6 group hover:shadow-xl transition-all duration-300">
            <div className="flex items-start gap-6">
              <div className="relative w-48 h-32 overflow-hidden rounded-lg">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary to-transparent opacity-60"></div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors">{event.title}</h2>
                <p className="text-gray-400 mb-4">{event.description}</p>
                <div className="grid grid-cols-2 gap-4">
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
                  <div className="flex items-center text-gray-400 group-hover:text-accent transition-colors">
                    <Users className="w-4 h-4 mr-2" />
                    <span>120 Registered</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Link 
                  href={`/registered-students/${event.id}`}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-accent transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-center"
                >
                  View Registrations
                </Link>
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-accent transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-2">
                  <LinkIcon className="w-4 h-4" />
                  Add Drive Link
                </button>
                <button className="px-4 py-2 bg-secondary-light text-white rounded-lg hover:bg-accent transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                  Edit Event
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEvents;