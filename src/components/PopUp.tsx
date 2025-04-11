import React from 'react';

interface SuccessPopupProps {
  message: string;
  visible: boolean;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({ message, visible }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white text-green-700 p-6 rounded-lg shadow-lg border border-green-300 flex items-center space-x-3">
        <svg
          className="w-6 h-6 text-green-600"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <span className="text-lg font-semibold">{message}</span>
      </div>
    </div>
  );
};

export default SuccessPopup;
