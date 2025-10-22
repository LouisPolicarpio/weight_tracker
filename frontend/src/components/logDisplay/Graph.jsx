import React from 'react'
import { LineChart, Line, XAxis, YAxis,Tooltip ,ResponsiveContainer  } from 'recharts';
import { LoaderCircle } from "lucide-react";

import  Card from '../Card'

function Graph({logs=[], loading=false}) {

    //const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, ...];
    const data = logs.map(log =>({
            date: new Date(log.created_at).getTime(),
            weight: log.weight,
    }))

    if (loading) {
        return (
        <Card>
            <LoaderCircle className="animate-spin text-blue-500 w-10 h-10" />
        </Card>
        );
    }

    
    if (!logs.length) {
        return (
        <Card>
            <p>No Results Found</p>
        </Card>
        );
    }

    return (
        <Card  className='w-full h-64 md:h-96'   >
            <ResponsiveContainer width='100%' height="100%">
                <LineChart data={data}  margin={{ top: 20, right: 30, bottom: 40, left: 20 }}  >
                        <XAxis 
                            dataKey="date"
                            interval={0} // forces all ticks
                            scale="time"
                            type='number'
                            domain={['dataMin', 'dataMax ']}
                            tickFormatter={(date) => new Date(date).toLocaleDateString('en-AU')}
                            tick={{ angle: -30, textAnchor: 'end' }}
                        />

                        <YAxis
                            dataKey="weight"
                            
                            type='number'
                            domain={[0, 'dataMax + 5']} // automatically adds padding
                            tickFormatter={(weight) => `${weight} kg` }

                        />
                        
                        <Tooltip
                            labelFormatter={(date) => new Date(date).toLocaleDateString('en-AU')} // formats the date label
                            formatter={(value) => [`${value} kg`, 'Weight']} // formats the data value
                        />
                        
                        <Line type="monotone" dataKey="weight" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
            

        </Card>
    )
}

export default Graph