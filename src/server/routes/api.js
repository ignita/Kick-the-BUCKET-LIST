const express = require('express');
const router = express.Router();

const categoriesController = require('../controllers/categoriesController');
const achievementsController = require('../controllers/achievementsController');
const subAchievementsController = require('../controllers/subAchievementsController');

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

module.exports = router;
