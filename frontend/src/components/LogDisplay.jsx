import React, { useState, useEffect } from "react";
import { getAllLogs } from "../services/logService";
import { LoaderCircle } from "lucide-react";
import Border from "./Card";

function LogDisplay({ refreshTrigger }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllLogs()
      .then((res) => setLogs(res.data || []))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [refreshTrigger]);

  if (loading) {
    return (
      <Border>
        <LoaderCircle className="animate-spin text-blue-500 w-10 h-10" />
      </Border>
    );
  }

  if (!logs.length) {
    return (
      <Border>
        <p>No results found</p>
      </Border>
    );
  }

  return (
    <Border>
      <table className="table-auto w-full text-left min-w-max">
        <thead>
          <tr>
            <th>Date</th>
            <th>Weight (kg)</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id} className="border-t border-gray-300">
                  <td>{new Date(log.created_at).toLocaleDateString('en-AU')}</td>
                  <td>{log.weight}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Border>
  );
}

export default LogDisplay;
