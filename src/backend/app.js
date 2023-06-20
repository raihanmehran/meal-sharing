const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");

const mealsRouter = require("./api/meals");
const buildPath = path.join(__dirname, "../../dist");
const port = process.env.PORT || 3000;
const cors = require("cors");
const logger = require("./middlewares/logger");

const documents = require("./documents.json");
const { log } = require("console");

// For week4 no need to look into this!
// Serve the built client html
app.use(express.static(buildPath));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(cors());

// Initial Middleware
app.use(logger);

router.use("/meals", mealsRouter);

app.get("/my-route", async (req, res) => {
  res.send("Hi friend");
});

// WEEK2 warmups:

app.get("/search", (req, res) => {
  const query = req.query.q;

  if (!query) {
    res.json(documents);
  } else {
    const filteredDocuments = documents.filter((doc) => {
      const values = Object.values(doc);
      return values.some((value) => {
        if (typeof value === "string" && value.includes(query)) {
          return true;
        }
      });
    });
    res.json(filteredDocuments);
  }
});
app.get("/documents/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const document = documents.find((doc) => doc.id === id);

  if (document) {
    res.json(document);
  } else {
    res.status(404).send("Document not found");
  }
});

app.post("/search", (req, res) => {
  const query = req.query.q;
  const fields = req.body.fields;

  if (query && fields) {
    res
      .status(400)
      .send("Both 'q' parameter and 'fields' body are not allowed");
  } else if (query) {
    const filteredDocuments = documents.filter((doc) => {
      const values = Object.values(doc);
      return values.some((value) => {
        if (typeof value === "string" && value.includes(query)) {
          return true;
        }
      });
    });

    res.json(filteredDocuments);
  } else if (fields) {
    const filteredDocuments = documents.filter((doc) => {
      return Object.entries(fields).every(([field, value]) => {
        return doc[field] && doc[field].toString() === value.toString();
      });
    });

    res.json(filteredDocuments);
  } else {
    res.json(documents);
  }
});

// WEEK1 warmups: REMYA
//GET /search
// app.get("/search", (req, res) => {
//   const { q } = req.query;

//   if (!q) {
//     // Return all documents if 'q' parameter is not provided
//     res.json(documents);
//   } else {
//     // Filter documents based on the 'q' parameter
//     const results = documents.filter((document) => {
//       const documentValues = Object.values(document);
//       return documentValues.some((value) => {
//         if (typeof value === "string" && value.includes(q)) {
//           return true;
//         }
//         return false;
//       });
//     });

//     if (results.length > 0) {
//       res.json(results);
//     } else {
//       res.status(400).json({ msg: `No documents found for the query: ${q}` });
//     }
//   }
// });

// app.get("/documents/:id", (req, res) => {
//   // const found = documents.some(
//   //   (document) => document.id === parseInt(req.params.id)
//   // );
//   // if (found) {
//   //   res.json(
//   //     documents.filter((document) => document.id === parseInt(req.params.id))
//   //   );
//   // } else {
//   //   res.status(400).json({ msg: `No member with id of ${req.params.id}` });
//   // }

//   const id = req.params.id;
//   if (isNaN(id)) res.status(400).json({ msg: "Id is not a number" });
//   const document = documents.filter((doc) => doc.id === parseInt(id));
//   if (document) res.status(200).json(document);
//   else res.status(404).json({ msg: "Document does not exist" });
// });

// // POST/search
// app.post("/search", (req, res) => {
//   const { q } = req.query;
//   const { fields } = req.body;

//   if (q && fields) {
//     return res.status(400).json({
//       error:
//         "Both 'q' query parameter and 'fields' in the request body cannot be provided together.",
//     });
//   }
//   let results = documents;
//   if (q) {
//     results = results.filter((document) => {
//       const documentValues = Object.values(document);
//       return documentValues.some(
//         (value) => typeof value === "string" && value.includes(q)
//       );
//     });
//   } else if (fields) {
//     results = results.filter((document) =>
//       Object.entries(fields).every(
//         ([field, value]) => document[field] === value
//       )
//     );
//   }
//   res.json(results);
// });

// app.get("/:id", async (request, response) => {
//   try {
//     const mealId = request.params.id;
//     // const meal = await knex("meal").where("id", mealId).first();
//     if (mealId) {
//       return res.status(404).json({ error: "meal not found" });
//     }
//     res.json(meal);
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// WEEK1 warm ups: HAMOUDI
// app.get("/search", (req, res) => {
//   try {
//     const query = req.query.q;
//     if (!query) {
//       res.status(200).json(documents);
//     } else if (!isNaN(query)) {
//       const result = documents.filter((e) => e.id === query);
//       console.log("s");
//       result.length === 0
//         ? res.status(200).json(documents)
//         : res.status(200).json(result);
//     } else {
//       const result = documents.filter((e) =>
//         Object.values(e).some(
//           (v) =>
//             typeof v === "string" &&
//             v.toLowerCase().includes(query.toLowerCase())
//         )
//       );
//       result.length === 0
//         ? res.status(200).json(documents)
//         : res.status(200).json(result);
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
// app.get("/documents/:id", (req, res) => {
//   try {
//     const id = req.params.id;
//     const result = documents.filter((e) => e.id === +id);
//     result.length === 0
//       ? res.status(404).json("no result with this id")
//       : res.status(200).json(result);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
// app.post("/search", (req, res) => {
//   try {
//     const query = req.query.q;
//     const fields = req.body.fields;
//     console.log("hi");
//     if (!query && !fields) {
//       res.status(200).json(documents);
//       console.log("1");
//     } else if (!query && fields) {
//       console.log("2");
//       const result = documents.filter((e) =>
//         Object.entries(fields).every(([key, value]) => e[key] === value)
//       );
//       result.length === 0
//         ? res.status(404).json("no result with this id")
//         : res.status(200).json(result);
//     } else if (query && !fields) {
//       if (!isNaN(+query)) {
//         const result = documents.filter((e) => e.id === +query);
//         result.length === 0
//           ? res.status(200).json("no result found")
//           : res.status(200).json(result);
//       }
//       console.log("3");
//     } else if (query && fields) {
//       console.log("4");
//       res.status(400).json("Bad request");
//     } else {
//       console.log("5");
//       const result = documents.filter((e) =>
//         Object.values(e).some(
//           (v) =>
//             typeof v === "string" &&
//             v.toLowerCase().includes(query.toLowerCase())
//         )
//       );
//       result.length > 0
//         ? res.status(200).json("no result found")
//         : res.status(200).json(result);
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// WEEK2 warmup: NELIA
// app.get("/search", async (req, res) => {
//   try {
//     // const query = req.query.q;
//     // if (!query) res.status(200).json(documents);
//     // else {
//     //   const filteredDocuments = documents.filter((doc) => {
//     //     if (doc.value) doc.value.includes(query);
//     //     console.log(doc);
//     //   });
//     //   console.log(filteredDocuments);
//     //   res.status(200).json(filteredDocuments);
//     // }

//     const query = req.query.q;

//     if (!query) {
//       res.status(200).json(documents);
//     } else {
//       const result = documents.filter((obj) =>
//         Object.values(obj).some((value) =>
//           String(value).toLowerCase().includes(query.toLowerCase())
//         )
//       );

//       result.length === 0 ? res.sendStatus(404) : res.status(200).json(result);
//     }
//   } catch (e) {
//     res.status(500).json("crashed: " + e);
//   }
// });

// // GET /documents/:id
// app.get("/documents/:id", (req, res) => {
//   try {
//     const id = req.params.id;

//     const result = documents.find((obj) => String(obj.id) === id);

//     result ? res.status(200).json(result) : res.sendStatus(404);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// // POST /search
// app.post("/search", (req, res) => {
//   try {
//     const query = req.query.q;
//     const fields = req.body.fields;

//     if (query && fields) {
//       res
//         .status(400)
//         .json(
//           "400 Bad request. Both query parameter 'q' in the URL and 'fields' in the request body cannot be provided."
//         );
//       return;
//     } else if (query) {
//       const result = documents.filter((obj) =>
//         Object.values(obj).some((value) =>
//           String(value).toLowerCase().includes(query.toLowerCase())
//         )
//       );

//       result.length === 0 ? res.sendStatus(404) : res.status(200).json(result);
//     } else if (fields) {
//       const result = documents.filter((obj) =>
//         Object.keys(fields).every((key) => fields[key] === obj[key])
//       );

//       result.length === 0 ? res.sendStatus(404) : res.status(200).json(result);
//     }
//   } catch (error) {
//     res.send(500).json(error);
//   }
// });

if (process.env.API_PATH) {
  app.use(process.env.API_PATH, router);
} else {
  throw "API_PATH is not set. Remember to set it in your .env file";
}

// for the frontend. Will first be covered in the react class
app.use("*", (req, res) => {
  res.sendFile(path.join(`${buildPath}/index.html`));
});

module.exports = app;
