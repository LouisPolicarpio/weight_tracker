import express from 'express';
import { getAllLogs, createLog,  updateLog, deleteLog} from '../controllers/logController.js';

const router = express.Router();

router.get('/', getAllLogs);
router.post('/', createLog);
router.patch('/:id', updateLog);
router.put('/:id', updateLog);
router.delete('/:id', deleteLog)

export default router;