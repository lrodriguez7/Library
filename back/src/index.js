const app = require("./app");
const mongoose = require("mongoose");
const userModel = require("./models/user.model");
const bcrypt = require("bcrypt-nodejs");

mongoose.Promise = global.Promise;

mongoose.connect("mongodb+srv://lrodriguez:q1w2e3r4@library.tl8ag.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        initApp();
        console.log("servidor 3001: activo");
        app.listen(3001, null);

    }).catch(err =>{

        console.log(err);
        
    });
    // =====================================================================================================

//default users

// =====================================================================================================
function initApp(){
    defaultAdmin();
    defaultCarne();
    defaultCUI();
}

// =====================================================================================================
 function defaultAdmin(){
    userModel.findOne({$or:[{nickUser: "adminpractica"},{emailUser: "admin@gmail.com"}]}, (err, user)=>{
        if(err){
            console.log(err);
        }else{
            if(!user){
                model = new userModel({
                    idUser: "2021000000001",
                    nameUser: "admin",
                    lastnameUser: "practica",
                    nickUser: "adminpractica",
                    emailUser: "admin@gmail.com",
                    rolUser: "admin",
                    passwordUser: bcrypt.hashSync("adminpractica")
                });
                model.save();
                console.log("admin default creado");
            }else{
                console.log("admin default");
            }
        }
    })
    
}

// =====================================================================================================
function defaultCarne(){
    userModel.findOne({idUser: "2021001"}, (err, user)=>{
        if(err){
            console.log(err);
        }else{
            if(!user){
                model = new userModel({
                    idUser: "2021001",
                    nameUser: "client",
                    lastnameUser: "client",
                    nickUser: "client1",
                    emailUser: "client1@gmail.com",
                    passwordUser: bcrypt.hashSync("12345678"),
                    rolUser: "estudiante"
                });
                model.save();
                console.log("client default creado");
            }else{
                console.log("client default");
            }
        }
    })
    
}

// =====================================================================================================
function defaultCUI(){
    userModel.findOne({idUser: "2021000000002"}, (err, user)=>{
        if(err){
            console.log(err);
        }else{
            if(!user){
                model = new userModel({
                    idUser: "2021000000002",
                    nameUser: "client",
                    lastnameUser: "client",
                    nickUser: "client2",
                    emailUser: "client2@gmail.com",
                    passwordUser: bcrypt.hashSync("12345678"),
                    rolUser: "bibliotecario"
                });
                model.save();
                console.log("client default creado");
            }else{
                console.log("client default");
            }
        }
    })
    
}