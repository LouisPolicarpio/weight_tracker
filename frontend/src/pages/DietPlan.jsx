import React from "react";
import { useEffect, useState } from "react";
import { getAllDietPlans } from "../services/dietPlanService";
import DietPlanDisplay from "../components/dietPlanComponents/dietPlanDisplay";

function DietPlan() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadPlans = async () => {
      setLoading(true);
      try {
        const res = await getAllDietPlans();
        setPlans(res.data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadPlans();
  }, []);

  return (
    <div>
      <DietPlanDisplay data={plans} loading={loading} />
    </div>
  );
}

export default DietPlan;
