import React from 'react'
import LogDisplay from '../components/LogDisplay'
import CreateLog from '../components/CreateLogForm'
function Home() {
  return (

    <div className='flex flex-col items-center gap-4'>
      <LogDisplay/>
      <CreateLog/>
    </div>
  )
}

export default Home
