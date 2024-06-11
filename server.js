// server.js
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const app = express();
dotenv.config();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});



const Planet = require("./models/planet.js")
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride(("_method")));
app.use(morgan("dev"));

// GET /
app.get("/", async (req, res) => {
    res.render("index.ejs");
});

app.get("/planets", async (req, res) => {
    const allPlanets = await Planet.find();
    res.render("./planets/planetlist.ejs", { allPlanets: allPlanets });
});

app.get("/planets/new", async (req, res) => {
    res.render("./planets/new.ejs");
});

app.get("/planets/:planetId", async (req, res) => {
    const foundPlanet = await Planet.findById(req.params.planetId);
    res.render("planets/show.ejs", { planet: foundPlanet });
  });
  
  // POST /
  app.post("/planets", async (req, res) => {
      if (req.body.isPopulationQuelled === "on") {
          req.body.isPopulationQuelled = true;
    } else {
        req.body.isPopulationQuelled = false;
    }
    if (req.body.isGlassed === "on") {
        req.body.isGlassed = true;
    } else {
        req.body.isGlassed = false;
    }
    await Planet.create(req.body);
    res.redirect("/planets/");
});

app.get("/planets/:planetId/edit", async (req, res) => {
   const foundPlanet = await Planet.findById(req.params.planetId);
   res.render("./planets/edit.ejs", { planet: foundPlanet});
});

// PUT /
app.put("/planets/:planetId", async (req, res) => {
    if (req.body.isPopulationQuelled === "on") {
        req.body.isPopulationQuelled = true;
  } else {
      req.body.isPopulationQuelled = false;
  }
  if (req.body.isGlassed === "on") {
      req.body.isGlassed = true;
  } else {
      req.body.isGlassed = false;
  }

  await Planet.findByIdAndUpdate(req.params.planetId, req.body);
  res.redirect(`/planets/${req.params.planetId}`);
 });

// DELETE /
app.delete("/planets/:planetId", async (req, res) => {
    await Planet.findByIdAndDelete(req.params.planetId);
    res.redirect("/planets");
 });

// LISTEN /
app.listen("3000", () => {
    console.log("Listening on port 3000");
});
