'use client';

import React from 'react';

interface Student {
  name: string;
  phone: string;
  email: string;
  enrollment: string;
  year: string;
  branch: string;
  attended: boolean;
}

interface RegisteredStudentsProps {
  eventId: string;
}

const RegisteredStudents: React.FC<RegisteredStudentsProps> = ({ eventId }) => {
  // In a real application, you would fetch students based on the eventId
  const students: Student[] = [
    { name: "Alice Smith", phone: "123-456-7890", email: "alice@example.com", enrollment: "2023001", year: "2", branch: "CSE", attended: true },
    { name: "Bob Johnson", phone: "987-654-3210", email: "bob@example.com", enrollment: "2023002", year: "2", branch: "ECE", attended: true },
    { name: "Charlie Brown", phone: "555-123-4567", email: "charlie@example.com", enrollment: "2023003", year: "1", branch: "MECH", attended: false },
    { name: "Diana Lee", phone: "111-222-3333", email: "diana@example.com", enrollment: "2023004", year: "3", branch: "CIVIL", attended: true },
    { name: "Ethan Davis", phone: "444-555-6666", email: "ethan@example.com", enrollment: "2023005", year: "3", branch: "CSE", attended: true },
    { name: "Fiona Wilson", phone: "777-888-9999", email: "fiona@example.com", enrollment: "2023006", year: "4", branch: "ECE", attended: true },
    { name: "George Martin", phone: "666-777-8888", email: "george@example.com", enrollment: "2023007", year: "4", branch: "MECH", attended: true },
    { name: "Hannah White", phone: "333-444-5555", email: "hannah@example.com", enrollment: "2023008", year: "1", branch: "CIVIL", attended: false },
    { name: "Ian Taylor", phone: "222-333-4444", email: "ian@example.com", enrollment: "2023009", year: "2", branch: "CSE", attended: true },
    { name: "Julia Anderson", phone: "888-999-0000", email: "julia@example.com", enrollment: "2023010", year: "2", branch: "ECE", attended: true },
  ];

  return (
    <div className="bg-black text-white min-h-screen p-4">
      <h1 className="text-2xl font-semibold mb-4">Registered Students for Event {eventId}</h1>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-700">
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Phone</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Enrollment No.</th>
            <th className="py-2 px-4 border-b">Year</th>
            <th className="py-2 px-4 border-b">Branch</th>
            <th className="py-2 px-4 border-b">Attended</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index} className="border-b hover:bg-gray-700">
              <td className="py-2 px-4">{student.name}</td>
              <td className="py-2 px-4">{student.phone}</td>
              <td className="py-2 px-4">{student.email}</td>
              <td className="py-2 px-4">{student.enrollment}</td>
              <td className="py-2 px-4">{student.year}</td>
              <td className="py-2 px-4">{student.branch}</td>
              <td className="py-2 px-4">
                {student.attended ? (
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