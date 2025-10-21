import React from 'react'
import LogDisplay from '../components/logDisplay/LogDisplay'
import CreateLog from '../components/CreateLogForm'
import EditLogForm from '../components/edit/EditLogForm'
import { useState, useEffect } from 'react'
import { getAllLogs } from '../services/logService'


function Home() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

  getAllLogs()
    .then((res) => setLogs(res.data || []))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
  }, []);

      return (


      <div className='flex flex-col items-center gap-4'>




      <LogDisplay data={logs} loading={loading} />
      <CreateLog/>
    </div>
  )
}

export default Home
