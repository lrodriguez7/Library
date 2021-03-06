const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

var userRoots = require("../src/roots/user.root");
const readingRoots = require("../src/roots/reading.root");

app.use("/api", userRoots, readingRoots)



module.exports = app;