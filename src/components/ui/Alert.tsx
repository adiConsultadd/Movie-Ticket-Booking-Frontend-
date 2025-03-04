import React from 'react';

interface AlertProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, type, onClose }) => {
  const baseClasses = "p-4 mb-4 rounded-md flex justify-between items-center";
  
  const typeClasses = {
    success: "bg-green-100 text-green-800 border border-green-200",
    error: "bg-red-100 text-red-800 border border-red-200",
    info: "bg-blue-100 text-blue-800 border border-blue-200",
    warning: "bg-yellow-100 text-yellow-800 border border-yellow-200",
  };
  
  return (
    <div className={`${baseClasses} ${typeClasses[type]}`}>
      <div>{message}</div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Close"
        >
          <span className="text-xl">&times;</span>
        </button>
      )}
    </div>
  );
};

export default Alert;