import React from 'react'
import LogDisplay from '../components/logDisplay/LogDisplay'
import CreateLog from '../components/CreateLogForm'
import EditLogForm from '../components/edit/EditLogForm'
import { useState, useEffect } from 'react'
import { getAllLogs } from '../services/logService'
import Graph from '../components/logDisplay/graph'
import Toggle from '../components/Toggle'
import { groupLogsByMode } from '../components/utils/formatLogs,js'

function Home() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState('day');
  const periods = ['day', 'week', 'month','year'];

  useEffect(() => {
    loadLogs();
  }, []);


  const  loadLogs = async () => {
    setLoading(true);
    try {
      const res = await getAllLogs()
      setLogs((res.data) || []);
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false);
    }
  }

  
  const groupedLogs = groupLogsByMode(logs, period)
  console.log(groupedLogs)
  console.log(logs)

    return (


      <div className='flex flex-col items-center gap-4'>


      <Toggle modes={periods} mode={period} setMode={setPeriod} />

      <LogDisplay data={groupedLogs} loading={loading} />
      <Graph logs={groupedLogs} loading={loading}/>

      <CreateLog/>
    </div>
  )
}

export default Home
