import { useState, useEffect } from 'react';

/**
 * Notification component for displaying alerts
 * @param {Object} props - Component props
 * @param {string} props.type - Type of notification ('success', 'error', 'info')
 * @param {string} props.message - Notification message
 * @param {boolean} props.show - Whether to show the notification
 * @param {Function} props.onClose - Function to call when notification is closed
 */
const Notification = ({ type = 'info', message, show = false, onClose }) => {
  const [isVisible, setIsVisible] = useState(show);

  // Show/hide notification on prop change
  useEffect(() => {
    setIsVisible(show);
    let timer;
    if (show) {
      timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, 3500); // Slightly faster for better UX
    }
    return () => clearTimeout(timer);
  }, [show, onClose]);

  // Manual close
  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  if (!isVisible || !message) return null;

  // Styles for different notification types
  const notificationStyles = {
    success: 'bg-green-100 text-green-900 border-green-400',
    error: 'bg-red-100 text-red-900 border-red-400',
    info: 'bg-blue-100 text-blue-900 border-blue-400',
  };

  // Icon for each type
  const icons = {
    success: (
      <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg className="w-6 h-6 mr-2 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    info: (
      <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01" />
      </svg>
    ),
  };

  return (
    <div
      className={`flex items-center px-5 py-4 rounded-lg shadow-lg border-l-4 ${notificationStyles[type] || notificationStyles.info} min-w-[260px] max-w-xs`}
      role="alert"
      style={{ zIndex: 9999 }}
    >
      {icons[type] || icons.info}
      <div className="flex-1">
        <span className="block font-semibold">
          {type === 'success' && 'Success! '}
          {type === 'error' && 'Error! '}
          {type === 'info' && 'Info: '}
        </span>
        <span className="block text-sm">{message}</span>
      </div>
      <button
        onClick={handleClose}
        className="ml-4 text-xl text-gray-500 hover:text-gray-700 focus:outline-none"
        aria-label="Close notification"
        tabIndex={0}
      >
        &times;
      </button>
    </div>
  );
};

export default Notification;