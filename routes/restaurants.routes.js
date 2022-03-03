const router = require('express').Router();
const Restaurant = require('../models/Restaurant.model');
const { isAuthenticated } = require('../middleware/jwt.middleware');


// create new restaurant

router.post('/restaurants', isAuthenticated, async (req, res, next) => {
  const { name, neighborhood, cuisine, budget, ambience, priority, notes, veganMenu, glutenFree } = req.body;
  const userId = req.payload._id;
  try {
    const restaurant = await Restaurant.create({ userId, name, neighborhood, cuisine, budget, ambience, priority, notes, veganMenu, glutenFree });
    res.json({ created: restaurant });
  } catch (error) {
    next(error);
  }
});



// show all restaurants

  router.get('/restaurants', isAuthenticated, async (req, res, next) => {

  const userId = req.payload._id;
  try {
    const allRestaurants = await Restaurant.find({ userId }).collation({ locale: 'en', strength: 2 }).sort({ name: 1 });
    res.json(allRestaurants);
  } catch (error) {
    next(error);
  }
});



// find restaurant

  router.post('/restaurants/find', isAuthenticated, async (req, res, next) => {
    const { name, neighborhood, cuisine, priority, budget, ambience, veganMenu, glutenFree } = req.body;
    const userId = req.payload._id;

    const query = { userId };
    if (name) {
      query.name = name;
    }
    if (neighborhood) {
      query.neighborhood = neighborhood;
    }
    if (cuisine) {
      query.cuisine = cuisine;
    }
    if (priority) {
      query.priority = priority;
    }
    if (budget) {
      query.budget = budget;
    }
    if (ambience) {
      query.ambience = ambience;
    }
    if (veganMenu) {
      query.veganMenu = veganMenu;
    }
    if (glutenFree) {
      query.glutenFree = glutenFree;
    }
  try {
    const foundRestaurants = await Restaurant.find(query)
    .collation({ locale: 'en', strength: 2 }).sort({ name: 1 });    
    res.json(foundRestaurants);
    console.log(foundRestaurants)
  } catch (error) {
    next(error);
  }

  });

// show restaurant details

router.get('/restaurants/:id', isAuthenticated, async (req, res, next) => {

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
router.delete('/restaurants/:id', isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  try {
    const restaurant = await Restaurant.findByIdAndDelete(id);
    res.json(restaurant);
  } catch (error) {
    next(error);
  }    
})

module.exports = router;