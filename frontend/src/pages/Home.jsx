import React, { useState, useEffect, useMemo } from "react";

import LogDisplay from "../components/logComponents/logDisplay/LogDisplay.jsx";
import CreateLog from "../components/logComponents/CreateLogForm.jsx";
import Graph from "../components/logComponents/logDisplay/Graph.jsx";

import Toggle from "../components/Toggle";
import { getAllLogs } from "../services/logService";
import { groupLogsByMode, filterLogs } from "../components/utils/formatLogs.js";

function Home() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState("day");
  const [startDate, setStartDate] = useState(null); // e.g., '2025-11-01'
  const [endDate, setEndDate] = useState(null); // e.g., '2025-11-30'

  const periods = ["day", "week", "month", "year"];

  useEffect(() => {
    const loadLogs = async () => {
      setLoading(true);
      try {
        const res = await getAllLogs();
        setLogs(res.data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadLogs();
  }, []);

  // Filter logs by date range
  const filteredLogs = useMemo(() => {
    return filterLogs(logs, startDate, endDate);
  }, [logs, startDate, endDate]);

  // Group logs by selected period
  const groupedLogs = useMemo(() => {
    return groupLogsByMode(filteredLogs, period);
  }, [filteredLogs, period]);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Period Toggle */}
      <div className="flex flex-row items-center gap-x-3">
        <p className="text-lg">Average per:</p>
        <Toggle modes={periods} mode={period} setMode={setPeriod} />
      </div>

      {/* Optional: Date filters */}
      <div className="flex gap-2">
        <div className=" border">
          <label>start:</label>
          <input
            type="date"
            value={startDate || ""}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className=" border border-rounded">
          <label>end:</label>
          <input
            type="date"
            value={endDate || ""}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      {/* Log display and graph */}
      <LogDisplay data={groupedLogs} loading={loading} />
      <Graph logs={groupedLogs} loading={loading} />

      <CreateLog />
    </div>
  );
}

export default Home;
