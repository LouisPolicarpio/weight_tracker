import React from 'react'
import { useState} from 'react'
import {HomeIcon, Menu, X} from 'lucide-react'
import { Link, useLocation} from 'react-router-dom';
function Navbar() {
  const [isOpen,setIsOpen] = useState(false);
    const location = useLocation();
  const isActive = (path) => location.pathname  === path ? "drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] text-blue-300": "";
  const toggleMenu = () => setIsOpen(prev => !prev);

  return (

    <nav className="w-full bg-blue-600 text-white shadow-md">

<div className="mx-auto px-4 py-2 flex items-center justify-between max-w-full">

        {/* desktop*/}
        <div className='hidden md:flex space-x-6 ${}'> 
          <Link to='/' className={`${isActive('/')}`}>
            <HomeIcon/>
          </Link>

          <Link to='/Edit' className={`${isActive('/edit')}`}>
            <h1>Edit</h1>
          </Link>


          <Link to='/test' className={`${isActive('/test')}`}>
            <h1>Test</h1>
          </Link>


        </div>
        
        {/* mobile toggle */}
      <button onClick={toggleMenu} className='md:hidden' > {isOpen ? <X  size={12}/> : <Menu size={12}/> }</button>

      </div>
      
      {/* mobile menu  */}
      {isOpen &&(
        <div className="md:hidden bg-blue-700 flex justify-evenly items-center p-1"> 
          <Link to='/' className={`${isActive('/')}`}>
            <HomeIcon/>
          </Link>

          
          <Link to='/edit' className={`${isActive('/edit')}`}>
            <h1>Edit</h1>
          </Link>

          <Link to='/test' className={`${isActive('/test')}`}>
            <h1>Test</h1>
          </Link>

        </div>
        
      )}


    </nav>
  )
}

export default Navbar
