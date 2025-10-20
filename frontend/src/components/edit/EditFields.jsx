import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { updateLog } from '../../services/logService';

function EditFields({ id, weight, date, onSuccess }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const formattedDate = date ? new Date(date).toISOString().split('T')[0] : '';

    useEffect(() => {
        reset({
            weight: weight || '',
            date: formattedDate || '',
        });
    }, [weight, formattedDate, reset]);

    const onSubmit = async (data) => {
        const payload = { ...data, date: data.date || null };
        try {
            const updatedLog = await updateLog(id, payload);
            if (onSuccess) onSuccess(updatedLog);
        } catch (error) {
            console.log(error);
        }
    };

    return (
    <form
    onSubmit={handleSubmit(onSubmit)}
    className="flex flex-col gap-4 w-full max-w-md p-4 bg-white rounded-2xl "
    >
    {/* Weight Field */}
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full">
        <label className="min-w-[70px] text-gray-700 font-medium">Weight:</label>
        <input
        type="number"
        {...register("weight", {
            required: "Weight is required",
            min: { value: 0, message: "Must be greater than 0" },
            max: { value: 1000, message: "Must be less than 1000" },
        })}
        className="border border-gray-300 hover:border-blue-800 rounded-sm p-1 flex-1 text-center w-full sm:w-auto"
        />
        {errors.weight && <p className="text-red-600 text-xs mt-1">{errors.weight.message}</p>}
    </div>

    {/* Date Field */}
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full">
        <label className="min-w-[70px] text-gray-700 font-medium">Date:</label>
        <input
        type="date"
        {...register("date")}
        className="border border-gray-300 hover:border-blue-800 rounded-sm p-1 flex-1 w-full sm:w-auto text-center"
        />
    </div>

    <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-800 text-white rounded-sm px-4 py-2 self-center"
    >
        Submit
    </button>
    </form>
    );
}

export default EditFields;
