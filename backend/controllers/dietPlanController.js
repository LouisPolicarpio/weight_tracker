import express from "express";
import { sql } from "../config/db.js";

export const getAllDietPlans = async (req, res) => {
  try {
    const plans = await sql`
            SELECT * FROM diet_plan
            ORDER BY created_at DESC;
        `;
    res.status(200).json({ success: true, data: plans });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const createDietPlan = async (req, res) => {
  const { name, startWeight, endWeight, startDate, endDate } = req.body;

  try {
    const plan = await sql`
            INSERT INTO diet_plan (name, start_weight, end_weight, start_date, end_date, created_at)
            VALUES (
                ${name},
                ${startWeight},
                ${endWeight},
                ${startDate},
                ${endDate},
                CURRENT_DATE
            )
            RETURNING *;
        `;
    res.status(201).json({ success: true, data: plan[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateDietPlan = async (req, res) => {
  const { id } = req.params;
  const { name, startWeight, endWeight, date } = req.body;

  try {
    const plan = await sql`
            UPDATE diet_plan
            SET
                name = COALESCE(${name}, name),
                start_weight = COALESCE(${startWeight}, start_weight),
                end_weight = COALESCE(${endWeight}, end_weight),
                created_at = COALESCE(${date}, created_at)
            WHERE id = ${id}
            RETURNING *;
        `;
    if (plan.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: "Diet plan not found" });
    }
    res.status(200).json({ success: true, data: plan[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteDietPlan = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await sql`
            DELETE FROM diet_plan
            WHERE id = ${id}
            RETURNING *;
        `;
    if (deleted.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: "Diet plan not found" });
    }
    res.status(200).json({ success: true, data: deleted[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
