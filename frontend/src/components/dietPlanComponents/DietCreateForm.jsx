import React, { useEffect, useState } from "react";
import Card from "../Card";
import { useForm } from "react-hook-form";
import { createDietPlan } from "../../services/dietPlanService";
import { getLatestLogs } from "../../services/logService";
import Toggle from "../Toggle";

function DietCreateForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const [rate, setRate] = useState(0);
  const [duration, setDuration] = useState(0);
  const [mode, setMode] = useState("day");

  const periods = ["day", "week", "month", "year"];

  const onSubmit = (data) => {
    console.log(data);
    createDietPlan(data);
  };

  // Prefill latest weight
  useEffect(() => {
    const fetchLatestWeight = async () => {
      try {
        const latestLog = await getLatestLogs(1);
        if (latestLog && latestLog.length > 0) {
          setValue("startWeight", latestLog[0].weight);
          const formattedDate = latestLog[0].created_at.split("T")[0];
          setValue("startDate", formattedDate);
        }
      } catch (error) {
        console.error("Error fetching latest weight:", error);
      }
    };
    fetchLatestWeight();
  }, [setValue]);

  // Watch values
  const startWeight = watch("startWeight");
  const endWeight = watch("endWeight");
  const startDate = watch("startDate");
  const endDate = watch("endDate");

  // Calculate rate and duration
  useEffect(() => {
    let totalDays = 0;
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = end - start;
      totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    if (startWeight != null && endWeight != null && totalDays > 0) {
      let durationValue = totalDays;
      let diff = endWeight - startWeight;

      switch (mode) {
        case "week":
          durationValue = totalDays / 7;
          break;
        case "month":
          durationValue = totalDays / 30;
          break;
        case "year":
          durationValue = totalDays / 365;
          break;
        default:
          durationValue = totalDays;
      }

      setRate((diff / Math.ceil(durationValue)).toFixed(2));
      setDuration(Math.floor(durationValue).toFixed(0));
    } else {
      setRate(0);
      setDuration(0);
    }
  }, [startWeight, endWeight, startDate, endDate, mode]);

  return (
    <Card>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4 items-center w-full max-w-md"
      >
        {/* Diet Plan Name */}
        <div className="flex flex-row justify-center gap-x-2 w-full">
          <label className="text-gray-700 font-medium mt-1 w-20">Name:</label>
          <div className="flex flex-col">
            <input
              type="text"
              {...register("name", { required: "Diet plan name is required" })}
              className="border border-gray-300 hover:border-blue-800 rounded-sm text-center w-45"
            />
            {errors.name && (
              <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>
        </div>

        {/* Start Weight */}
        <div className="flex flex-row justify-center gap-x-2 w-full">
          <label className="text-gray-700 font-medium mt-1 w-20">
            Start Weight:
          </label>
          <div className="flex flex-col">
            <input
              type="number"
              {...register("startWeight", {
                required: "Start weight is required",
                min: { value: 0, message: "Must be greater than 0" },
                max: { value: 1000, message: "Must be less than 1000" },
              })}
              className="border border-gray-300 hover:border-blue-800 rounded-sm text-center w-45"
            />
            {errors.startWeight && (
              <p className="text-red-600 text-xs mt-1">
                {errors.startWeight.message}
              </p>
            )}
          </div>
        </div>

        {/* Goal Weight */}
        <div className="flex flex-row justify-center gap-x-2 w-full">
          <label className="text-gray-700 font-medium mt-1 w-20">
            Goal Weight:
          </label>
          <div className="flex flex-col">
            <input
              type="number"
              {...register("endWeight", {
                required: "Goal weight is required",
                min: { value: 0, message: "Must be greater than 0" },
                max: { value: 1000, message: "Must be less than 1000" },
              })}
              className="border border-gray-300 hover:border-blue-800 rounded-sm text-center w-45"
            />
            {errors.endWeight && (
              <p className="text-red-600 text-xs mt-1">
                {errors.endWeight.message}
              </p>
            )}
          </div>
        </div>

        {/* Start Date */}
        <div className="flex flex-row justify-center gap-x-2 w-full">
          <label className="text-gray-700 font-medium mt-1 w-20">
            Start Date:
          </label>
          <input
            type="date"
            {...register("startDate", { required: "Start date is required" })}
            className="border border-gray-300 hover:border-blue-800 rounded-sm text-center w-45"
          />
          {errors.startDate && (
            <p className="text-red-600 text-xs mt-1">
              {errors.startDate.message}
            </p>
          )}
        </div>

        {/* End Date */}
        <div className="flex flex-row justify-center gap-x-2 w-full">
          <label className="text-gray-700 font-medium mt-1 w-20">
            End Date:
          </label>
          <input
            type="date"
            {...register("endDate", {
              required: "End date is required",
              validate: (value) =>
                !startDate ||
                new Date(value) > new Date(startDate) ||
                "End date must be after start date",
            })}
            className="border border-gray-300 hover:border-blue-800 rounded-sm text-center w-45"
          />
          {errors.endDate && (
            <p className="text-red-600 text-xs mt-1">
              {errors.endDate.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-800 text-white rounded-sm px-2 py-1 mx-2"
        >
          Create
        </button>
      </form>

      {/* Toggle + Rate/Duration */}
      <div className="mt-6 w-full max-w-md">
        <Toggle modes={periods} mode={mode} setMode={setMode} />
        <div className="flex justify-between mt-4">
          <div className="flex flex-col">
            <span className="text-gray-700 font-medium">Rate:</span>
            <span className="text-gray-900">
              {rate} kg/{mode}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-700 font-medium">Duration:</span>
            <span className="text-gray-900">
              {duration} {mode === "day" ? "days" : mode + "s"}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default DietCreateForm;
