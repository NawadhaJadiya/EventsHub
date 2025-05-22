'use client';
import { getDirectDriveImageUrl } from "@/helper/getDirectDriveImageUrl";

import { useRouter, useSearchParams} from 'next/navigation';
import { Calendar, MapPin, Clock, User } from 'lucide-react';
import useAuthStatus from '../hooks/useAuthStatus';
import PopUp from './PopUp';
import { useState, useEffect } from 'react';
import { EventTypes } from '../types';
import axios from 'axios';


const EventDetails = () => {
  const [event, setEvent] = useState<EventTypes>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get('id');
  useEffect(() => {
    const storedEvent = localStorage.getItem('selectedEvent');
    if (storedEvent) {
      setEvent(JSON.parse(storedEvent));
    }
  }, []);
  
  const { isLoggedIn, isAdmin, logout } = useAuthStatus();
  const [showPopup, setShowPopup] = useState(false);
  const [message , setMessage] = useState(false);
  

  if (!event) return <div>Loading event...</div>;

  
  
  const handleRegister = async () => {
    if(!isLoggedIn){
      router.push('/login');
    }
    
    else if(isAdmin){
      setShowPopup(true)
      setTimeout(() => {
        setShowPopup(false);
        router.push('/');
      }, 2000);
    }
    else {
      try {
    const user = await axios.get('/api/me')
    const userData = user.data
    const Eventdata = {
      userId: userData.id,
      eventId: event._id,
    };
    
    
    
    const response = await axios.put('/api/users/register', Eventdata);
    alert(response.data.message)
    console.log(response.data)
      } catch (error : any) {
        alert(error.message)
        console.log(error.message)
      }
      finally{
    
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        router.push('/');
      }, 2000);
    }}
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative mb-8">
        <img
          src={getDirectDriveImageUrl(event.image)!}
          alt={event.name}
          className="w-full h-64 object-cover rounded-lg shadow-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary to-transparent opacity-60 rounded-lg"></div>
      </div>

      <div className="bg-secondary rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-white mb-4">{event.name}</h1>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center text-gray-400 hover:text-accent transition-colors">
            <Calendar className="w-5 h-5 mr-2 text-primary" />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center text-gray-400 hover:text-accent transition-colors">
            <MapPin className="w-5 h-5 mr-2 text-primary" />
            <span>{event.location}</span>
          </div>
          
          <div className="flex items-center text-gray-400 hover:text-accent transition-colors">
            <Clock className="w-5 h-5 mr-2 text-primary" />
            <span>Register by {new Date(event.deadline).toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center text-gray-400 hover:text-accent transition-colors">
            <User className="w-5 h-5 mr-2 text-primary" />
            <span>{event.organizer}</span>
          </div>
        </div>

        <div className="prose max-w-none mb-8">
          <h2 className="text-xl font-semibold text-white mb-2">About the Event</h2>
          <p className="text-gray-400">{event.description}</p>
        </div>

        <button
          className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-accent transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          onClick={handleRegister}
        >
          Register Now
        </button>
      </div>

      <PopUp visible={showPopup} message={(!isAdmin) ? 'Registration Complete' : 'Login with a user account or create one'} />
    </div>
  );
};

export default EventDetails;