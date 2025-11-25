import { LoaderCircle } from "lucide-react";
import Card from "../../Card";
import Loading from "../../Loading";
function LogDisplay({ data = [], loading = false }) {
  if (loading) {
    return (
      <Card>
        <Loading />
      </Card>
    );
  }

  if (!data.length) {
    return (
      <Card>
        <p>No Results Found</p>
      </Card>
    );
  }

  return (
    <Card>
      <table className="table-auto  w-full text-center min-w-max">
        <thead>
          <tr>
            <th>Date</th>
            <th>Weight (kg)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((log) => (
            <tr key={log.id} className="border-t border-gray-300 ">
              <td>{new Date(log.created_at).toLocaleDateString("en-AU")}</td>
              <td>{log.weight}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

export default LogDisplay;
