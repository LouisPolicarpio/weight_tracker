import React from 'react'

function Toggle({modes, mode, setMode}) {
  return (
    <div className='flex flex-row bg-gr "bg-slate-300 rounded border-2 border-gray-400 overflow-hidden m-1 w-fit'>
        {modes.map((m)=>(
            <button
                key={m}
                onClick={()=>setMode(m)}
                className={`
                    text-sm font-bold  h-full p-2   justify-center transition-all duration-200  flex w-14  ${mode === m ? "bg-blue-500 shadow text-white" :"bg-transparent"}
                `}
                >
                {m}


            </button>
        ))}
        
        
    </div>
  )
}

export default Toggle