import React, { useEffect, useState } from 'react';
import { getAllLogs, deleteLog } from "../../services/logService";
import { LoaderCircle, CircleX, SquarePen } from "lucide-react";
import Card from "../Card";
import Modal from '../Modal';
import EditFields from './EditFields';

function EditLogForm() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [editLog, setEditLog] = useState(null); // single state for editing

  // Fetch logs initially
  useEffect(() => {
    getLogs();
  }, []);

  const getLogs = async () => {
    try {
      setLoading(true);
      const res = await getAllLogs();
      setLogs(res.data || []);
    } catch (error) {
      console.error('Error getting logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this log?")) return;
    try {
      await deleteLog(id);
      setLogs((prevLogs) => prevLogs.filter((log) => log.id !== id));
      console.log('Deleted log successfully');
    } catch (error) {
      console.error('Error deleting logs:', error);
    }
  };

  if (loading) {
    return (
      <Card className="flex justify-center items-center w-full p-4">
        <LoaderCircle className="animate-spin text-blue-500 w-10 h-10" />
      </Card>
    );
  }

  if (!logs.length) {
    return (
      <Card className="flex justify-center items-center w-full p-4">
        <p>No Results Found</p>
      </Card>
    );
  }

  return (
    <div className='w-full flex flex-col items-center gap-4 p-2'>

      {/* Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white p-4 rounded-xl w-full max-w-sm">
            {editLog && (
              <EditFields
                id={editLog.id}
                weight={editLog.weight}
                date={editLog.created_at}
                onSuccess={(updatedLog) => {
                  setLogs(prevLogs =>
                    prevLogs.map(log => log.id === updatedLog.id ? updatedLog : log)
                  );
                  setShowModal(false);
                  setEditLog(null);
                }}
              />
            )}
          </div>
        </div>
      </Modal>

      {/* Logs Table */}
      <Card className="w-full max-w-md overflow-x-auto">
        <table className="table-auto w-full text-center">
          <thead>
            <tr>
              <th className="px-2 py-1">Date</th>
              <th className="px-2 py-1">Weight (kg)</th>
              <th className="px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(({ id, weight, created_at }) => (
              <tr key={id} className="border-t border-gray-300">
                <td className="px-2 py-1">{new Date(created_at).toLocaleDateString('en-AU')}</td>
                <td className="px-2 py-1">{weight}</td>
                <td className="px-2 py-1">
                  <div className="flex justify-center gap-2">
                    <button
                      className='hover:text-red-800 text-red-600 px-2 py-1 rounded-sm'
                      onClick={() => handleDelete(id)}
                    >
                      <CircleX />
                    </button>
                    <button
                      className='hover:text-yellow-700 text-yellow-500 px-2 py-1 rounded-sm'
                      onClick={() => {
                        setEditLog({ id, weight, created_at });
                        setShowModal(true);
                      }}
                    >
                      <SquarePen />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

export default EditLogForm;
