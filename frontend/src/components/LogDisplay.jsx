import React, { useState, useEffect } from "react";
import { getAllLogs } from "../services/logService";
import { LoaderCircle } from "lucide-react";
import Card from "./Card";

function LogDisplay() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllLogs()
      .then((res) => setLogs(res.data || []))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

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
    <Card>
      <table className="table-auto w-full text-center min-w-max">
        <thead>
          <tr>
            <th>Date</th>
            <th>Weight (kg)</th>
          </tr>
        </thead>
        <tbody >
          {logs.map((log) => (
            <tr key={log.id} className="border-t border-gray-300 ">
                  <td>{new Date(log.created_at).toLocaleDateString('en-AU')}</td>
                  <td>{log.weight}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

export default LogDisplay;
