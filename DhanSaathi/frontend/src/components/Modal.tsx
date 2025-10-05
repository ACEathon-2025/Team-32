// src/components/Modal.tsx
import React from "react";

interface ModalProps {
  children: React.ReactNode;
  isOpen?: boolean;          // Optional: control modal visibility
  onClose?: () => void;      // Optional: close callback
}

const Modal: React.FC<ModalProps> = ({ children, isOpen = true, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* Modal box */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md relative">
        {/* Close button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            ✕
          </button>
        )}

        {/* Modal content */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
