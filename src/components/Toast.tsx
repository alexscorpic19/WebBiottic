import { X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

export function Toast({ message, type, onClose }: ToastProps) {
  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  }[type];

  return (
    <div className={`fixed bottom-4 right-24 ${bgColor} text-white px-4 py-2 rounded-lg shadow-lg flex items-center z-50 max-w-md`}>
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 flex-shrink-0">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
