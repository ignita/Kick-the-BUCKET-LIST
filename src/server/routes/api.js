import express from 'express';
const router = express.Router();

import categoriesController from '../controllers/categoriesController.js';
import achievementsController from '../controllers/achievementsController.js';
import subAchievementsController from '../controllers/subAchievementsController.js';
import statsController from '../controllers/statsController.js';

router.get('/categories', categoriesController.all);
router.get('/categories/:id', categoriesController.getSubById);

router.get('/achievements', achievementsController.all);
router.get('/achievements/:id', achievementsController.get);
router.post('/achievements', achievementsController.store);
router.put('/achievements/:id', achievementsController.update);
router.delete('/achievements/:id', achievementsController.delete);

router.get('/sub-achievements/:id', subAchievementsController.get);
router.post('/sub-achievements', subAchievementsController.store);
router.put('/sub-achievements/:id', subAchievementsController.update);
router.delete('/sub-achievements/:id', subAchievementsController.delete);

router.get('/stats/trending', statsController.getTrending);

export default router;
