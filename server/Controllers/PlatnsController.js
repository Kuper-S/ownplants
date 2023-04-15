const { Plant } = require('../models/plant');

// Create a new plant document
exports.createPlant = async (req, res, next) => {
  try {
    const newPlant = await Plant.create(req.body);
    res.status(201).json(newPlant);
  } catch (error) {
    next(error);
  }
};

// Get all plant documents
exports.getPlants = async (req, res, next) => {
  try {
    const plants = await Plant.find();
    res.json(plants);
  } catch (error) {
    next(error);
  }
};

// Get a specific plant document by ID
exports.getPlantById = async (req, res, next) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) {
      const error = new Error('Plant not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(plant);
  } catch (error) {
    next(error);
  }
};

// Update a specific plant document by ID
exports.updatePlantById = async (req, res, next) => {
  try {
    const plant = await Plant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!plant) {
      const error = new Error('Plant not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(plant);
  } catch (error) {
    next(error);
  }
};

// Delete a specific plant document by ID
exports.deletePlantById = async (req, res, next) => {
  try {
    const plant = await Plant.findByIdAndDelete(req.params.id);
    if (!plant) {
      const error = new Error('Plant not found');
      error.statusCode = 404;
      throw error;
    }
    res.json({ message: 'Plant deleted successfully' });
  } catch (error) {
    next(error);
  }
};
