const express = require("express");
const controller = require("../controllers/reading.controller");
const Auth = require("../middlewares/auth");

var token = new Auth();
var api = express.Router();

api.get("/readings", token.ensureAuthOptional, controller.list);
api.post("/reading/register", token.ensureAuth, controller.register);
api.put("/reading/edit/:idReading", token.ensureAuth, controller.edit);
api.delete("/reading/delete/:idReading", token.ensureAuth, controller.remove);

module.exports = api;