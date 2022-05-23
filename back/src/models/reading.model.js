const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var readingSchema = Schema({
author: String,
tittle: String,
edition: String,
currentFrequency: String,
example: String,
description: String,
copy: Number,
status: Number,

topics: [],
keyWords: [],
rol: {type: String, default:"reading", enum:["reading","libro","revista"]}

});

module.exports = mongoose.model("reading", readingSchema);