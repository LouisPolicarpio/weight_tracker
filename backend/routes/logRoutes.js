import express from "express";
import {
  getAllLogs,
  createLog,
  updateLog,
  deleteLog,
  getLatestLogs,
} from "../controllers/logController.js";

const router = express.Router();

router.get("/", getAllLogs);
router.post("/", createLog);
router.patch("/:id", updateLog);
router.put("/:id", updateLog);
router.delete("/:id", deleteLog);
router.get("/latest", getLatestLogs);
export default router;
