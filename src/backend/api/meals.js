const express = require("express");
const router = express.Router();
const knex = require("../database");
const moment = require("moment");

// http://localhost:5000/api/meals	GET,	Returns all meals
router.get("/", async (req, res) => {
  try {
    console.log("hi");
    const meals = await knex("meal").select("id", "title");

    meals.length === 0
      ? res.status(404).send("Meals not found")
      : res.status(200).send(meals);
  } catch (error) {
    res.status(500).json(error);
  }
});

// /api/meals	POST, Adds a new meal to the database
router.post("/", async (req, res) => {
  try {
    const meal = req.body;

    const addMeal = await knex("meal").insert(meal);
    console.log(addMeal.status);
    console.log(addMeal);
    res.status(201).send({ message: "Added meal" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// /api/meals/:id	GET,	Returns the meal by id
router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const meal = await knex("meal").select("id", "title").where({ id });

    meal.length === 0
      ? res.status(404).send("Meal not found")
      : res.status(200).send(meal);
  } catch (error) {
    res.status(500).json(error);
  }
});

// /api/meals/:id PUT,	Updates the meal by id
router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const meal = req.body;

    const meals = await knex("meal").select("id");
    console.log(meals);
    const updateMeal = await knex("meal").where({ id }).update(meal);

    id > meals.length
      ? res.status(404).send("Meal not found")
      : res.status(200).send({ message: "Updated meal" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// /api/meals/:id	DELETE,	Deletes the meal by id
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const meals = await knex("meal").select("id");
    const deleteMeal = await knex("meal").where({ id }).del();

    id > meals.length
      ? res.status(404).send("Meal not found")
      : res.status(200).send({ message: "Deleted meal" });
  } catch (error) {
    res.status(500).json(error);
  }
});

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

// // Respond with all meals in the future (relative to the when datetime)
// router.get("/future-meals", async (req, res) => {
//   try {
//     console.log("hello");
//     const row = await knex.raw(
//       "SELECT * FROM meal WHERE `when_datetime` > now()"
//     );
//     res.status(200).json(row[0]);
//   } catch (e) {
//     res.status(500).json(e);
//   }
// });

// //Respond with all meals in the past (relative to the when datetime)
// router.get("/past-meals", async (req, res) => {
//   try {
//     console.log("here");
//     const row = await knex.raw(
//       "SELECT * FROM meal WHERE `when_datetime` < now()"
//     );
//     res.status(200).json(row[0]);
//   } catch (e) {
//     res.status(500).json(e);
//   }
// });

// //Respond with all meals sorted by ID
// router.get("/all-meals", async (req, res) => {
//   try {
//     const meals = await knex.raw("SELECT * FROM meal ORDER BY ID");
//     if (meals) res.status(200).json(meals[0]);
//     res.status(404).json("No meals found!");
//   } catch (e) {
//     res.status(500).json(e);
//   }
// });
// //Respond with the first meal (meaning with the minimum id)
// router.get("/first-meal", async (req, res) => {
//   try {
//     const meal = await knex.raw("SELECT * FROM meal ORDER BY id ASC limit 1");
//     if (meal) {
//       res.status(200).json(meal[0][0]);
//     } else {
//       res.status(404).json("there are no meals");
//     }
//   } catch (e) {
//     res.status(500).json(e);
//   }
// });
// router.get("/:id", async (req, res) => {
//   try {
//     const meal = await knex.raw(
//       `SELECT * FROM meal WHERE ID = ${req.params.id}`
//     );
//     if (meal) {
//       res.status(200).json(meal[0][0]);
//     } else {
//       res.status(404).json("there are no meals");
//     }
//   } catch (e) {
//     res.status(500).json(e);
//   }
// });

// // First Post Method
// router.post("/add", async (req, res) => {
//   try {
//     const meal = {
//       title: req.body.title,
//       description: req.body.description,
//       location: req.body.location,
//       price: req.body.price,
//       max_reservations: parseInt(req.body.max_reservations),
//       when_datetime: moment().format("YYYY-MM-DD"),
//       created_date: moment().format("YYYY-MM-DD"),
//     };
//     console.log(meal);
//     let query = `INSERT INTO meal (title, description, location, max_reservations, price) VALUES ('${meal.title}', '${meal.description}', '${meal.location}',${meal.max_reservations}, ${meal.price} )`;

//     await knex.raw(query);

//     console.log("User added");

//     res.status(200).json("Hi");
//   } catch (e) {
//     res.status(500).json(e);
//   }
// });

// router.put("/update", async (req, res) => {
//   try {
//     const meal = {
//       id: parseInt(req.body.id),
//       title: req.body.title,
//       description: req.body.description,
//       location: req.body.location,
//       price: req.body.price,
//       max_reservations: req.body.max_reservations,
//     };

//     const isExist = await knex.raw("SELECT * FROM meal WHERE id =" + meal.id);
//     if (isExist[0][0]) {
//       console.log(isExist[0][0]);
//       res.status(200).json("Updated");
//     } else {
//       res.status(400).json("Bad request: No meal found with id :" + meal.id);
//     }
//   } catch (e) {
//     res.status(500).json(e);
//   }
// });

// router.delete("/delete/:id", async (req, res) => {
//   try {
//     const id = parseInt(req.params.id);
//     if (!id) return res.status(400).json("id not provied");

//     const isExist = await knex.raw(
//       "SELECT * FROM meal WHERE id =" + req.params.id
//     );
//     if (isExist[0][0]) {
//       // write code for delettion of the meal
//       res.status(200).json("Deleted");
//     } else {
//       res.status(400).json("Bad request: No meal found with id :" + meal.id);
//     }
//   } catch (e) {
//     res.status(500).json(e);
//   }
// });

// // 	Respond with the last meal (meaning with the maximum id)
// // router.get("/last-meal", async (req, res) => {
// //   try {
// //     const meal = await knex.raw("SELECT * FROM meal ORDER BY id desc limit 1");
// //     if (meal) {
// //       res.status(200).json(meal[0][0]);
// //     } else {
// //       res.status(404).json("there are no meals");
// //     }
// //   } catch (e) {
// //     res.status(500).json(e);
// //   }
// // });

// router.get(
//   "/last-meal",
//   getMeals("SELECT * FROM meal ORDER BY id DESC LIMIT 1", 404)
// );

// function getMeals(query, status = 200) {
//   return async (req, res) => {
//     try {
//       const meals = await knex.raw(query);
//       if (meals.length > 1 && meals[0].length > 0) {
//         res.status(200).json(meals[0]);
//       } else {
//         if (status === 200) {
//           res.status(200).json("");
//         } else if (status === 404) {
//           res.status(404).json("There are no meals");
//         }
//       }
//     } catch (e) {
//       res.status(500).json(e.message);
//     }
//   };
// }

module.exports = router;
