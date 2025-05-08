"use client";

import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Router } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const HostEvent = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    organizer : '',
    maxParticipants: '',
    date: '',
    deadline : '',
    category : '',
    location : '',
    endDate: '',
    time : '',
    guests: [] as string[],
    image: '',
    });

  const handleSubmit = async (e: React.FormEvent) =>{

    e.preventDefault();
    try{
      setLoading(true)
      
      const res = await axios.post('api/admin/hostEvent', eventData);
      console.log(res.data);
      alert("Event created succesfully")
      router.push('/')

    }
    catch(error : any){
        alert(error.message)
    }
    finally{setLoading(false)}
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Host an Event</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-secondary rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Event Details</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Event Title
              </label>
              <input
                type="text"
                value={eventData.name}
                onChange={(e) => setEventData({ ...eventData, name: e.target.value })}
                className="w-full px-4 py-2 bg-secondary-light border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-black"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Description
              </label>
              <textarea
                value={eventData.description}
                onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
                className="w-full px-4 py-2 bg-secondary-light border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-black"
                rows={4}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Organizer
              </label>
              <input
                type="text"
                value={eventData.organizer}
                onChange={(e) => setEventData({ ...eventData, organizer: e.target.value })}
                className="w-full px-4 py-2 bg-secondary-light border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-black"
                required
              />
            </div>


            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Event Type
              </label>
              <select
                value={eventData.category}
                onChange={(e) => setEventData({ ...eventData, category: e.target.value })}
                className="w-full px-4 py-2 bg-secondary-light border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-black"
                required
              >
                <option value="">Select Event Type</option>
                <option value="Workshop">Workshop</option>
                <option value="Show">Show</option>
                <option value="Seminar">Seminar</option>
                <option value="Webinar">Webinar</option>
                <option value="Recruitment">Recruitment</option>
                <option value="Competition">Competition</option>
                <option value="Quiz">Quiz</option>
                <option value="Training Programs">Training Programs</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Max Participants
              </label>
              <input
                type="number"
                value={eventData.maxParticipants}
                onChange={(e) => setEventData({ ...eventData, maxParticipants: e.target.value })}
                className="w-full px-4 py-2 bg-secondary-light border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-black"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Event Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    value={eventData.date}
                    onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 bg-secondary-light border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-black"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Registration Deadline
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    value={eventData.deadline}
                    onChange={(e) => setEventData({ ...eventData, deadline: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 bg-secondary-light border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-black"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={eventData.location}
                  onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 bg-secondary-light border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-black"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">
                End Date (Optional)
              </label>
              <input
                type="date"
                value={eventData.endDate}
                onChange={(e) => setEventData({ ...eventData, endDate: e.target.value })}
                className="w-full px-4 py-2 bg-secondary-light border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Time
              </label>
              <input
                type="time"
                value={eventData.time as string}
                onChange={(e) => setEventData({ ...eventData, time: e.target.value as string})}
                className="w-full px-4 py-2 bg-secondary-light border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-black"
              />
            </div>


            <div>
  <label className="block text-sm font-medium text-white mb-1">
    Guests / Speakers (Optional)
  </label>

  {eventData.guests.map((guest, index) => (
    <div key={index} className="flex items-center gap-2 mb-2">
      <input
        type="text"
        value={guest}
        onChange={(e) => {
          const updatedGuests = [...eventData.guests];
          updatedGuests[index] = e.target.value;
          setEventData({ ...eventData, guests: updatedGuests });
        }}
        className="w-full px-4 py-2 bg-secondary-light border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-black"
      />
      <button
        type="button"
        onClick={() => {
          const updatedGuests = eventData.guests.filter((_, i) => i !== index);
          setEventData({ ...eventData, guests: updatedGuests });
        }}
        className="text-red-500 hover:text-red-700"
      >
        ✕
      </button>
    </div>
  ))}

  <button
    type="button"
    onClick={() => setEventData({ ...eventData, guests: [...eventData.guests, ""] })}
    className="mt-2 px-3 py-1 bg-primary text-white rounded hover:bg-opacity-80"
  >
    + Add Guest
  </button>
</div>


            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Add URL of poster/brochure
              </label>
              <input
                type="url"
                value={eventData.image}
                onChange={(e) => setEventData({ ...eventData, image: e.target.value })}
                className="w-full px-4 py-2 bg-secondary-light border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-black"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-accent transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          {(loading) ? 'Loading' : 'Create Event'}
        </button>
      </form>
    </div>
  );
};

export default HostEvent;