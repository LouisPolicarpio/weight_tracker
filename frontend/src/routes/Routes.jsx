import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Test from "../pages/Test";
import Edit from "../pages/Edit";
import DietPlan from "../pages/DietPlan";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/test" element={<Test />} />
      <Route path="/edit" element={<Edit />} />
      <Route path="/DietPlan" element={<DietPlan />} />
    </Routes>
  );
}

export default AppRoutes;
