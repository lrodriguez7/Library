const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var userSchema = Schema({
    idUser: String,
    nameUser: String,
    lastnameUser: String,
    nickUser: String,
    emailUser: String,
    passwordUser: String,
    
    borrowed: [{type: mongoose.Schema.Types.ObjectId, ref: "bibliographys" }],
    record: [{type: mongoose.Schema.Types.ObjectId, ref: "bibliographys" }],

    rolUser: {type: String, default:"user", enum:["user","estudiante","bibliotecario","admin"]}
});

module.exports = mongoose.model("users",userSchema);