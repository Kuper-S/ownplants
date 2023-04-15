const express = require('express');
const router = express.Router();
const UserController = require('./controllers/userController');
const PlantsController = require('./controllers/plantsController');
const { authenticate } = require('../middlewares/authMiddleware');

// User routes
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/users', authenticate, UserController.getAllUsers);
router.get('/users/:id', authenticate, UserController.getUserById);
router.put('/users/:id', authenticate, UserController.updateUserById);
router.delete('/users/:id', authenticate, UserController.deleteUserById);

// Plants routes
router.get('/plants', authenticate, PlantsController.getAllPlants);
router.get('/plants/:id', authenticate, PlantsController.getPlantById);
router.post('/plants', authenticate, PlantsController.addPlant);
router.put('/plants/:id', authenticate, PlantsController.updatePlantById);
router.delete('/plants/:id', authenticate, PlantsController.deletePlantById);

module.exports = router;
