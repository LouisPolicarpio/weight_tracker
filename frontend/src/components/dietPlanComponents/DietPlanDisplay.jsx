import React, { useState, useEffect } from "react";
import Loading from "../Loading";
import Card from "../Card";

function DietPlanDisplay({ data = [], loading = false }) {
  const [activePlan, setActivePlan] = useState(null);

  // Set initial plan safely when data arrives
  useEffect(() => {
    if (data.length > 0) {
      setActivePlan(data[0].id);
    }
  }, [data]);

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
        <p>No Diet Plans Found</p>
      </Card>
    );
  }

  return (
    <Card>
      <div>
        <div className="flex flex-row gap-2 w-full p-2 rounded-lg">
          {data.map((plan) => {
            const isActive = plan.id === activePlan;

            return (
              <button
                key={plan.id}
                onClick={() => setActivePlan(plan.id)}
                className={`
                px-3 py-1 rounded-lg text-sm font-medium transition
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow"
                    : "bg-white text-blue-600 border border-blue-300 hover:bg-blue-100"
                }
              `}
              >
                {plan.name}
              </button>
            );
          })}
        </div>

        <div className="mt-4">
          {/* You can display the active plan info here */}
          <p className="text-gray-700">
            Selected Plan ID:{" "}
            <span className="font-semibold">{activePlan}</span>
          </p>
        </div>
      </div>
    </Card>
  );
}

export default DietPlanDisplay;
