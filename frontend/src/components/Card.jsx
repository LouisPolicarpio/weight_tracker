import React from 'react';

function Card({ children, style = 'w-full', bg ='bg-white', onClick }) {
  return (
    <div className={`px-40 pt-4 min-w-max mb-4 ${style}` } onClick={onClick}>
      <div className={`p-2 w-full overflow-hidden flex items-center justify-center border-2 rounded-2xl border-gray-300 ${bg}`}>
        {children}
      </div>
    </div>
  );
}

export default Card;
