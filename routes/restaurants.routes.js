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