const router = require('express').Router();
const Restaurant = require('../models/Restaurant.model');


// create new restaurant

router.post('/restaurants', async (req, res, next) => {
  const { name, neighborhood, cuisine, budget, ambience, priority, notes, veganMenu, glutenFree } = req.body;

  try {
    const restaurant = await Restaurant.create({ name, neighborhood, cuisine, budget, ambience, priority, notes, veganMenu, glutenFree });
    res.json({ created: restaurant });
  } catch (error) {
    next(error);
  }
});



// show all restaurants

router.get('/restaurants', async (req, res, next) => {
  try {
    const allRestaurants = await Restaurant.find();
    res.json(allRestaurants);
  }
  catch (error) {
    next(error);
  }
})

module.exports = router;

// show restaurant details

router.get('/restaurants/:id', async (req, res, next) => {

  const { id } = req.params;

  try {
    const restaurant = await Restaurant.findById(id);
    if (restaurant === null) {
      return res.status(404).json({error: 'Restaurant not found'})
    }
    return res.json(restaurant);
  }
  catch (error) {
    next(error);
  }
})

// update resstaurant

router.put('/restaurants/:id', async (req, res, next) => {
  const { id } = req.params;
  const { name, neighborhood, cuisine, budget, ambience, priority, veganMenu, glutenFree, notes } = req.body;
  
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(id, { name, neighborhood, cuisine, budget, ambience, priority, veganMenu, glutenFree, notes });
    res.json(restaurant);
  } 
  catch (error) {
    next(error);
  }  
})

// delete restaurant
router.delete('/restaurants/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const restaurant = await Restaurant.findByIdAndDelete(id);
    res.json(restaurant);
  } catch (error) {
    next(error);
  }    
})