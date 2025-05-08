// components/CameraPopup.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { FaCamera } from 'react-icons/fa';

export default function CameraPopup() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error('Error accessing camera: ', err);
    }
  };

  const closeCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
    }
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      openCamera();
    } else {
      closeCamera();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"
      >
        <FaCamera /> Open Camera
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-4 w-full max-w-md shadow-lg relative">
            <video ref={videoRef} className="w-full rounded-lg" autoPlay muted />
            <button
              onClick={closeCamera}
              className="absolute top-2 right-2 text-red-500 font-bold text-xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
