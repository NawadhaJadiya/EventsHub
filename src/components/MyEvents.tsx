'use client';

import { Calendar, MapPin, Clock, Users, Link as LinkIcon } from 'lucide-react';
import { EventTypes } from '../types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';

const MyEvents = () => {
  
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<EventTypes[]>([]);
  const [adminId, setAdminId] = useState<any>(null);

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const userResponse = await axios.get('/api/me');
        setAdminId(userResponse.data);
        const eventsResponse = await axios.get(`/api/admin/getMyEvents/${userResponse.data.id}`);
        console.log('Full events response:', eventsResponse);
        const eventsData = eventsResponse.data.events || [];
        console.log('Events data:', eventsData);
        setEvents(eventsData);
        

      } catch (err) {
        console.error('Error details:', err);
        
      } finally {
        setLoading(false);
      }
      
    };

    fetchMyEvents();
  }, []);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">My Events</h1>
      <div className="space-y-6">
        {events.map((event) => (
          <div key={event._id} className="bg-secondary rounded-lg shadow-md p-6 group hover:shadow-xl transition-all duration-300">
            <div className="flex items-start gap-6">
              <div className="relative w-48 h-32 overflow-hidden rounded-lg">
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary to-transparent opacity-60"></div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors">{event.name}</h2>
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
                    <span>Register by {new Date(event.deadline).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-gray-400 group-hover:text-accent transition-colors">
                    <Users className="w-4 h-4 mr-2" />
                    <span>120 Registered</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Link 
                  href={`/registered-students/${event._id}`}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-accent transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-center"
                >
                  View Registrations
                </Link>
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-accent transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-2">
                  <LinkIcon className="w-4 h-4" />
                  Add Drive Link
                </button>
                <Link 
                  href={`/check-in/${event._id}`}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-accent transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-center">
                      Start check in
                    </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEvents;