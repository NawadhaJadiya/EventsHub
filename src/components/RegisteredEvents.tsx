'use client';
import { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { EventTypes } from '../types';
import Link from 'next/link';
import axios from 'axios';

const RegisteredEvents = () => {
  
  const [events, setEvents] = useState<EventTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [debugInfo, setDebugInfo] = useState<any>(null);

  useEffect(() => {
    const fetchUserAndEvents = async () => {
      try {
        const userResponse = await axios.get('/api/me');
        console.log('User response:', userResponse.data);
        setUserData(userResponse.data);
        
        if (userResponse.data.id) {
          const eventsResponse = await axios.get(`/api/users/getRegisteredEvents/${userResponse.data.id}`);
          console.log('Full events response:', eventsResponse);
          
          // Store debug info
          setDebugInfo({
            userId: userResponse.data.id,
            eventsResponse: eventsResponse.data,
            eventsArray: eventsResponse.data.events,
            eventsLength: eventsResponse.data.events?.length
          });
          
          // Ensure events is an array and has valid data
          const eventsData = eventsResponse.data.events || [];
          console.log('Events data:', eventsData);
          
          // Filter out any null or undefined events
          const validEvents = eventsData.filter((event: any) => event && typeof event === 'object');
          console.log('Valid events:', validEvents);
          
          setEvents(validEvents);
        } else {
          console.log('No user ID found in response');
        }
      } catch (err) {
        console.error('Error details:', err);
        setError('Failed to fetch events');
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {error}
      </div>
    );
  }

  if (!events || events.length === 0) {
    return (
      <div className="text-center p-4">
        <div className="text-gray-400 mb-4">You haven't registered for any events yet.</div>
        {debugInfo && (
          <div className="text-sm text-gray-500 mt-4">
            <p>Debug Information:</p>
            <p>User ID: {debugInfo.userId}</p>
            <p>Events in response: {debugInfo.eventsLength || 0}</p>
            <p>Response structure: {JSON.stringify(debugInfo.eventsResponse, null, 2)}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Registered Events</h1>
      <div className="space-y-6">
        {events.map((event) => {
          // Add additional safety checks
          if (!event || typeof event !== 'object') {
            console.log('Invalid event:', event);
            return null;
          }
          
          return (
            <div key={event._id || Math.random()} className="bg-secondary rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="flex">
                <div className="relative w-48">
                  <img
                    src={event.image || 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80'}
                    alt={event.name || 'Event Image'}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary to-transparent opacity-60"></div>
                </div>
                <div className="flex-1 p-6">
                  <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors">{event.name || 'Unnamed Event'}</h2>
                  <p className="text-gray-400 mb-4">{event.description || 'No description available'}</p>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center text-gray-400 group-hover:text-accent transition-colors">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{event.date ? new Date(event.date).toLocaleDateString() : 'Date not set'}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-400 group-hover:text-accent transition-colors">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{event.location || 'Location not set'}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-400 group-hover:text-accent transition-colors">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{event.time || 'Time not set'}</span>
                    </div>
                  </div>
                </div>
                <div className="w-48 p-6 bg-secondary-light flex flex-col justify-center items-center border-l border-gray-600">
                  <div className="text-center mb-4">
                    <div className="text-sm text-gray-400">Registration Status</div>
                    <div className="font-semibold text-primary">Confirmed</div>
                  </div>
                  <Link 
                    href={`/registered-events/qr/${userData?.id}`}
                    className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-accent transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-center"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RegisteredEvents;