import React from 'react';

function Card({ children, className = 'w-full', bg ='bg-white', onClick }) {
  return (
    <div className={`px-4 md:px-40 pt-4  min-w-max mb-4 ${className}` } onClick={onClick}>
      <div className={`p-2 w-full overflow-hidden h-full flex items-center justify-center border-2 rounded-2xl border-gray-300 ${bg}`}>
        {children}
      </div>
    </div>
  );
}

export default Card;
