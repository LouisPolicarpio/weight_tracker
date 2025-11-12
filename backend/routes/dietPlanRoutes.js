import express from 'express';
import { getAllDietPlans, createDietPlan,  updateDietPlan, deleteDietPlan} from '../controllers/dietPlanController.js';

const router = express.Router();

router.get('/', getAllDietPlans);
router.post('/', createDietPlan);
router.patch('/:id', updateDietPlan);
router.put('/:id', updateDietPlan);
router.delete('/:id', deleteDietPlan)

export default router;