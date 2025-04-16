'use client';

import React from 'react';
import axios from 'axios'


const QRCodePage = async () => { 
  // In a real application, you would generate this URL based on your API
  const user = await axios.get('api/me')
  const userData = user.data
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${userData.email}`;

  return (
    <div className="bg-gray-800 text-gray-200 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold mb-6">Event QR Code</h1>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <img src={qrCodeUrl} alt="QR Code" className="w-64 h-64" />
      </div>
      <p className="mt-4 text-sm text-gray-400">
        Scan this QR code to mark attendance for the event.
      </p>
    </div>
  );
};

export default QRCodePage;