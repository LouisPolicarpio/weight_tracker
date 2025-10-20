import React from 'react';
import { X } from 'lucide-react';

function Modal({ isOpen, onClose, children, style = 'sm:w-3/4 md:w-1/2 max-w-md' }) {
    if (!isOpen) return null;

    const handleContentClick = (e) => e.stopPropagation();

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center "
            onClick={onClose}
        >
            <div
                className={`relative rounded-2xl bg-white shadow-lg ${style} p-6`}
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
