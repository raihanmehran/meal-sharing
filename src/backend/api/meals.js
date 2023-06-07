const express = require("express");
const router = express.Router();
const knex = require("../database");

router.get("/", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const titles = await knex("meal").select("title");
    console.log(titles);
    response.json(titles);
  } catch (error) {
    throw error;
  }
});

// Respond with all meals in the future (relative to the when datetime)
router.get("/future-meals", async (req, res) => {
  try {
    console.log("hello");
    const row = await knex.raw(
      "SELECT * FROM meal WHERE `when_datetime` > now()"
    );
    res.status(200).json(row[0]);
  } catch (e) {
    res.status(500).json(e);
  }
});

//Respond with all meals in the past (relative to the when datetime)
router.get("/past-meals", async (req, res) => {
  try {
    const row = await knex.raw(
      "SELECT * FROM meal WHERE `when_datetime` < now()"
    );
    res.status(200).json(row[0]);
  } catch (e) {
    res.status(500).json(e);
  }
});

//Respond with all meals sorted by ID
router.get("/all-meals", async (req, res) => {
  try {
    const meals = await knex.raw("SELECT * FROM meal ORDER BY ID");
    if (meals) res.status(200).json(meals[0]);
    res.status(404).json("No meals found!");
  } catch (e) {
    res.status(500).json(e);
  }
});
//Respond with the first meal (meaning with the minimum id)
router.get("/first-meal", async (req, res) => {
  try {
    const meal = await knex.raw("SELECT * FROM meal ORDER BY id ASC limit 1");
    if (meal) {
      res.status(200).json(meal[0][0]);
    } else {
      res.status(404).json("there are no meals");
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

// 	Respond with the last meal (meaning with the maximum id)
// router.get("/last-meal", async (req, res) => {
//   try {
//     const meal = await knex.raw("SELECT * FROM meal ORDER BY id desc limit 1");
//     if (meal) {
//       res.status(200).json(meal[0][0]);
//     } else {
//       res.status(404).json("there are no meals");
//     }
//   } catch (e) {
//     res.status(500).json(e);
//   }
// });

router.get(
  '/last-meal',
  getMeals('SELECT * FROM meal ORDER BY id DESC LIMIT 1', 404)
);

function getMeals(query, status = 200) {
  return async (req, res) => {
    try {
      const meals = await knex.raw(query);
      if (meals.length > 1 && meals[0].length > 0) {
        res.status(200).json(meals[0]);
      } else {
        if (status === 200) {
          res.status(200).json("");
        } else if (status === 404) {
          res.status(404).json("There are no meals");
        }
      }
    } catch (e) {
      res.status(500).json(e.message);
    }
  };
}

module.exports = router;
