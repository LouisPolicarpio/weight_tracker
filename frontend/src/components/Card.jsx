import React from 'react'

function Border({children}) {
  return (
    <div className="w-full px-40 pt-4 min-w-max ">
      <div className="p-2 w-full overflow-hidden flex items-center justify-center border-2 rounded-2xl border-gray-300">
        {children}
      </div>
    </div>
  )
}

export default Border
