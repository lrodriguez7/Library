const Auth = require("../middlewares/auth");

var token = new Auth();

const readingModel = require("../models/reading.model");




var jsonResponse = {
    error: 500,
    message: null,
    data: null,
    token: null
}

// ============================================================================================== \\

function register(req, res){
    
    statusClean();
    
    var params = req.body;
    var datatoken = req.user;

    var registerModel;
    var schema= {};

    params.rol?schema.rol = params.rol:null;
    params.author?schema.author = params.author:null;
    params.tittle?schema.tittle = params.tittle:null;
    params.edition?schema.edition = params.edition:null;
    params.description?schema.description = params.description:null;
    params.topics?schema.topics = params.topics:null;
    params.copy?schema.copy =params.copy:null;
    params.status?schema.status = params.status:null;
    params.keyWords?schema.keyWords = params.keyWords:null;

    //if the rol is revista add this params
    params.rol = "revista"?params.currentFrequency?schema.currentFrequency = params.currentFrequency:null:null;
    params.rol = "revista"?params.example?schema.example = params.example:null:null;
    
    if(datatoken.rolUser == "admin" || datatoken.rolUser == "bibliotecario"){
        if( params.author &&
            params.tittle &&
            params.edition &&
            params.description &&
            params.topics &&
            params.copy &&
            params.status &&
            params.keyWords){
                if(!params.rol && params.rol == "revista" && !params.currentFrequency && !params.example){
                    jsonResponse.error = 403;
                    jsonResponse.message = "rellene todos los campos obligatorios";
                    res.status(jsonResponse.error).send(jsonResponse);
                    statusClean();
                }else{
                readingModel.findOne({$and:[{Author: params.Author},
                    {tittle: params.tittle},
                    {edition: params.edition},
                    {description: params.description}]}).exec((err, readingFound)=>{
                        if(err){
                            jsonResponse.message = "Error al comprobar la lectura";
                        
                            res.status(jsonResponse.error).send(jsonResponse);

                        }else{
                            if(readingFound){
                                jsonResponse.error = 403;
                                jsonResponse.message = "Error de registro, la lectura ya existe";
                                jsonResponse.data = readingFound;
                            
                                res.status(jsonResponse.error).send(jsonResponse);

                            }else{
                                registerModel = new readingModel(schema);
                            
                                registerModel.save((err, readingSaved)=>{
                                    if(err){
                                        jsonResponse.message = "Error al registrar lectura";
                                    
                                        res.status(jsonResponse.error).send(jsonResponse);

                                    }else{
                                        jsonResponse.message = "lectura registrada!!";
                                        jsonResponse.data = {readingSaved};
                                    
                                        res.status(jsonResponse.error).send(jsonResponse);

                                    }
                                })
                            }
                        }
                        
                    });
                statusClean();
                }
            }else{
                jsonResponse.error = 403;
                jsonResponse.message = "rellene todos los campos obligatorios";
                res.status(jsonResponse.error).send(jsonResponse);
                statusClean();
            }
    }else{
        jsonResponse.error = 400;
            jsonResponse.message = "No tienes acceso";
            res.status(jsonResponse.error).send(jsonResponse);
            statusClean();
    }
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function list(req, res){

    statusClean();
    params = req.body;
    var order = 1;
    
        readingModel.find({rol: params.rol}).exec((err, readingFound)=>{
            if(err){
                jsonResponse.message = "error al listar las lecturas";
            }else{
                if(readingFound && readingFound.length > 0){
                    jsonResponse.error = 200;
                    jsonResponse.message = "lecturas obtenidas";
                    jsonResponse.data = readingFound;
                }else{
                    jsonResponse.error = 404;
                    jsonResponse.message = "no se encontraron las lecturas";
                }
            }
            res.status(jsonResponse.error).send(jsonResponse);
            statusClean();
        });
    statusClean();
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function edit(req, res){
    
    statusClean();
    
    var params = req.body;
    var idReading = req.params.idReading;
    var datatoken = req.user;

    var schema= {};

    params.rol?schema.rol = params.rol:null;
    params.author?schema.author = params.author:null;
    params.tittle?schema.tittle = params.tittle:null;
    params.edition?schema.edition = params.edition:null;
    params.description?schema.description = params.description:null;
    params.topics?schema.topics = params.topics:null;
    params.copy?schema.copy =params.copy:null;
    params.status?schema.status = params.status:null;
    params.keyWords?schema.keyWords = params.keyWords:null;

    //if the rol is revista add this params
    params.rol = "revista"?params.currentFrequency?schema.currentFrequency = params.currentFrequency:null:null;
    params.rol = "revista"?params.example?schema.example = params.example:null:null;
    
    if(datatoken.rolUser == "admin"){
        readingModel.findByIdAndUpdate(idReading,schema, {new: true, useFindAndModify: false}, (err, readingUpdate)=>{
            if(err){
                jsonResponse.message = "error al editar lectura";
                
                res.status(jsonResponse.error).send(jsonResponse);
            }else{
                if(readingUpdate){
                    jsonResponse.error = 200;
                    jsonResponse.message = "lectura actualizado!!"
                    jsonResponse.data = readingUpdate;

                    res.status(jsonResponse.error).send(jsonResponse);
                }else{
                    jsonResponse.error = 404;
                    jsonResponse.message = "no se encontro la lectura";

                    res.status(jsonResponse.error).send(jsonResponse);
                }
            }
            statusClean();
        });
    }else{
        jsonResponse.error = 403;
        jsonResponse.message = "No tienes permisos para editar";

        res.status(jsonResponse.error).send(jsonResponse);
    }
    statusClean();





}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function remove(req, res){
    
    statusClean();
    
    var idReading = req.params.idReading;
    var datatoken = req.user;
    
    if(datatoken.rolUser == "admin"){
        readingModel.findByIdAndDelete(idReading, (err, readingDeleted)=>{
            if(err){
                jsonResponse.message = "error al eliminar lectura"

                res.status(jsonResponse.error).send(jsonResponse);
            }else{
                if(readingDeleted){
                    jsonResponse.error = 200;
                    jsonResponse.message = "lectura eliminada!!"

                }else{
                    jsonResponse.error = 404;
                    jsonResponse.message = "lectura no existente";

                    
                }
                res.status(jsonResponse.error).send(jsonResponse)
            }
        })
    }else{
        jsonResponse.error = 403;
        jsonResponse.message = "No tienes permisos para editar";

        res.status(jsonResponse.error).send(jsonResponse);
    }
    statusClean();
}


//=====================================================================================================\\
//                                         Reusable functions 
//=====================================================================================================\\

function statusClean(){
    jsonResponse = {
        error: 500,
        message: null,
        data: null,
        token: null
    }
}



//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\\

module.exports = {
    register,
    list,
    edit,
    remove
    
}