const express = require("express");
const Restaurant = require('../models/index');

const router = express.Router();


router.get("/", async (req, res) => {
   const restaurants = await Restaurant.findAll();
   res.json(restaurants);
});

router.get("/:id", async (req, res) => {
   const id = req.params.id;
   const restaurant = await Restaurant.findByPk(id);
   res.json(restaurant);
});

router.post("/", async (req, res) => {
   try {
      const restaurant = await Restaurant.create(req.body);
      res.json(restaurant);
   } catch (error) {
      res.status(400).json('Error creating restaurant');
   }
});

router.put("/:id", async (req, res) => {
   try {
      const id = req.params.id;
      await Restaurant.update(req.body, { where: { id: id } });
      const updatedRestaurant = await Restaurant.findByPk(id);
      res.json(updatedRestaurant);
   } catch (error) {
      res.status(400).json('Error updating restaurant');
   }
});

router.delete("/:id", async (req, res) => {
   try {
      const id = req.params.id;
      await Restaurant.destroy({ where: { id: id } });
      res.send();
   } catch (error) {
      res.status(400).json('Error deleting restaurant');
   }
});

module.exports = router;