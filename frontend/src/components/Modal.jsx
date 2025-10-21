import React from 'react';
import { X } from 'lucide-react';

function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    const handleContentClick = (e) => e.stopPropagation();

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="relative rounded-2xl bg-white shadow-lg  sm:w-3/4 md:w-2/3 lg:w-1/2 max-w-md   p-4 sm:p-6 mx-2"
                onClick={handleContentClick}
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-red-600 hover:text-red-800"
                >
                    <X size={20} />
                </button>
                {children}
            </div>
        </div>
    );
}

export default Modal;
