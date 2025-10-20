import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from '../pages/Home'
import Test from '../pages/Test'
import Edit from '../pages/Edit'

function AppRoutes() {
  return (
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/test' element={<Test />}/>
        <Route path='/edit' element={<Edit />}/>

      </Routes>    
  )
}

export default AppRoutes
