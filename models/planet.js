// models/planet.js

const mongoose = require("mongoose");

// SCHEMA /
const planetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    nickname: String,
    isPopulationQuelled: Boolean,
    isGlassed: Boolean,
    image: String,
});

const Planet = mongoose.model('Planet', planetSchema)
module.exports = Planet;