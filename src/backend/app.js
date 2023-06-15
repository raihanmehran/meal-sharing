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

// WEEK1 warm ups: HAMOUDI
app.get("/search", (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      res.status(200).json(documents);
    } else if (!isNaN(query)) {
      const result = documents.filter((e) => e.id === query);
      console.log("s");
      result.length === 0
        ? res.status(200).json(documents)
        : res.status(200).json(result);
    } else {
      const result = documents.filter((e) =>
        Object.values(e).some(
          (v) =>
            typeof v === "string" &&
            v.toLowerCase().includes(query.toLowerCase())
        )
      );
      result.length === 0
        ? res.status(200).json(documents)
        : res.status(200).json(result);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
app.get("/documents/:id", (req, res) => {
  try {
    const id = req.params.id;
    const result = documents.filter((e) => e.id === +id);
    result.length === 0
      ? res.status(404).json("no result with this id")
      : res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});
app.post("/search", (req, res) => {
  try {
    const query = req.query.q;
    const fields = req.body.fields;
    console.log("hi");
    if (!query && !fields) {
      res.status(200).json(documents);
      console.log("1");
    } else if (!query && fields) {
      console.log("2");
      const result = documents.filter((e) =>
        Object.entries(fields).every(([key, value]) => e[key] === value)
      );
      result.length === 0
        ? res.status(404).json("no result with this id")
        : res.status(200).json(result);
    } else if (query && !fields) {
      if (!isNaN(+query)) {
        const result = documents.filter((e) => e.id === +query);
        result.length === 0
          ? res.status(200).json("no result found")
          : res.status(200).json(result);
      }
      console.log("3");
    } else if (query && fields) {
      console.log("4");
      res.status(400).json("Bad request");
    } else {
      console.log("5");
      const result = documents.filter((e) =>
        Object.values(e).some(
          (v) =>
            typeof v === "string" &&
            v.toLowerCase().includes(query.toLowerCase())
        )
      );
      result.length > 0
        ? res.status(200).json("no result found")
        : res.status(200).json(result);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

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
