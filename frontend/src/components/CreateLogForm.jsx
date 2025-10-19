import React from 'react'
import Card from './Card'
import {useForm} from 'react-hook-form'
import { createLog } from '../services/logService';

function CreateLog() {

    const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
      const payload = {
        ...data,
        date: data.date ? data.date : null,
      };
    console.log(payload);
    createLog(payload)
  };

  return (
    <Card>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4 items-center   w-full max-w-md'>
          
        <div className="flex flex-row justify-center gap-x-2 w-full">
          <label className="text-gray-700 font-medium mt-1  w-15">Weight:</label>
          
          <div className="flex flex-col">
            <input
              type="number"
              {...register("weight", {
                required: "Weight is required",
                min: { value: 0, message: "Must be greater than 0" },
                max: { value: 1000, message: "Must be less than 1000" },
              })}
              className=' border  border-gray-300   hover:border-blue-800 rounded-sm text-center w-45' 
            />
            {errors.weight && (
              <p className="text-red-600 text-xs mt-1">{errors.weight.message}</p>
            )}
          </div>
        </div>


        <div className='flex flex-row justify-center gap-x-2 w-full '>
          <label className="text-gray-700 font-medium  w-15">Date:</label>
          <input 
            type ="date" 
            {...register("date")} 
            className=' border  border-gray-300   hover:border-blue-800 rounded-sm text-center w-45' 
          />
        </div>
          
          <button type='submit'  className='bg-blue-600  hover:bg-blue-800 text-white rounded-sm px-2 py-1 mx-2 justify-center'  > Add </button>
        </form>
    </Card>

  )
}

export default CreateLog
