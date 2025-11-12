import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
import { LoaderCircle } from "lucide-react";

import Card from "../../Card";

function Graph({ logs = [], loading = false }) {
  // Map logs to chart-friendly format
  const data = logs.map((log) => ({
    date: new Date(log.created_at).getTime(),
    weight: log.weight,
  }));

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
    <Card className="w-full h-64 md:h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 40, bottom: 50, left: 20 }}
        >
          {/* Grid */}
          <CartesianGrid stroke="#bedbff" strokeDasharray="5 5" />

          {/* X-axis */}
          <XAxis
            dataKey="date"
            interval="preserveStartEnd"
            scale="time"
            type="number"
            domain={[
              (dataMin) => dataMin,
              (dataMax) => dataMax + 24 * 60 * 60 * 1000, // Add 1 day padding
            ]}
            tickFormatter={(date) => new Date(date).toLocaleDateString("en-AU")}
            tick={{ angle: -30, textAnchor: "end" }}
          />

          {/* Y-axis */}
          <YAxis
            dataKey="weight"
            type="number"
            domain={[
              (min) => Math.floor(min - 5), // padding below min
              (max) => Math.ceil(max + 5), // padding above max
            ]}
            tickFormatter={(weight) => `${weight} kg`}
          />

          {/* Tooltip */}
          <Tooltip
            labelFormatter={(date) =>
              new Date(date).toLocaleDateString("en-AU")
            }
            formatter={(value) => [`${value} kg`, "Weight"]}
          />

          {/* Main data line */}
          <Line
            type="monotone"
            dataKey="weight"
            stroke="#155dfc"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}

export default Graph;
