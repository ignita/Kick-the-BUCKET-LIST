const express = require('express');
const router = express.Router();

const categoriesController = require('../controller/categoriesController');
const achievementsController = require('../controller/achievementsController');
const subAchievementsController = require('../controller/subAchievementsController');

router.get('/categories', categoriesController.all);

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
