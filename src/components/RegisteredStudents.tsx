'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RegistrationTypes } from '@/types';

interface RegisteredStudentsProps {
  eventId: string;
}

const RegisteredStudents: React.FC<RegisteredStudentsProps> = ({ eventId }) => {
  const [registrations, setRegistrations] = useState<RegistrationTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
 

  // Fetch the registered students when the component mounts
  useEffect(() => {
    const fetchRegisteredStudents = async () => {
      try {
        const response = await axios.get(`/api/admin/getRegisteredStudents/${eventId}`);
        console.log('Registrations received are:', response.data); 
        const studentData = response.data.registrations;
        setRegistrations(studentData); 
      } catch (error) {
        console.error('Error fetching students:', error);
        setRegistrations([]); 
      } finally {
        setLoading(false);
      }
    };
  
    fetchRegisteredStudents();
  }, [eventId]);
  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen p-4">
      <h1 className="text-2xl font-semibold mb-4">Registered Students for Event {eventId}</h1>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-700">
          <th className="py-2 px-4 border-b">Time</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Phone</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Enrollment No.</th>
            <th className="py-2 px-4 border-b">Year</th>
            <th className="py-2 px-4 border-b">Course</th>
            <th className="py-2 px-4 border-b">Branch</th>
            <th className="py-2 px-4 border-b">Attended</th>

          </tr>
        </thead>
        <tbody>
          {registrations.map((registration, index) => (
            <tr key={index} className="border-b hover:bg-gray-700">
              <td className="py-2 px-4">time</td>
              <td className="py-2 px-4">{registration.name}</td>
              <td className="py-2 px-4">{registration.phoneNumber}</td>
              <td className="py-2 px-4">{registration.email}</td>
              <td className="py-2 px-4">{registration.enrollmentNumber}</td>
              <td className="py-2 px-4">{registration.year}</td>
              <td className="py-2 px-4">{registration.course}</td>
              <td className="py-2 px-4">{registration.branch}</td>
              <td className="py-2 px-4">
                {registration.attended ? (
                  <span className="text-green-500">&#10004;</span>
                ) : (
                  <span className="text-red-500">&#10008;</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegisteredStudents;
