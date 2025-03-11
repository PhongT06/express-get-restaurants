const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/restaurants", async (req, res) => {
   const restaurants = await Restaurant.findAll();
   res.json(restaurants);
});

app.get("/restaurants/:id", async (req, res) => {
   const id = req.params.id;
   const restaurant = await Restaurant.findByPk(id);
   res.json(restaurant);
});

app.post("/restaurants", async (req, res) => {
   try {
      const restaurant = await Restaurant.create(req.body);
      res.json(restaurant);
   } catch (error) {
      res.status(400).json('Error creating restaurant');
   }
});

app.put("/restaurants/:id", async (req, res) => {
   try {
      const id = req.params.id;
      await Restaurant.update(req.body, { where: { id: id } });
      const updatedRestaurant = await Restaurant.findByPk(id);
      res.json(updatedRestaurant);
   } catch (error) {
      res.status(400).json('Error updating restaurant');
   }
});

app.delete("/restaurants/:id", async (req, res) => {
   try {
      const id = req.params.id;
      await Restaurant.destroy({ where: { id: id } });
      res.send();
   } catch (error) {
      res.status(400).json('Error deleting restaurant');
   }
});
module.exports = app;