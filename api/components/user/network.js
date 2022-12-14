const express = require('express');

const secure = require('./secure');
const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

//Separar las rutas
router.get('/', list);
router.get('/:id', get);
router.post('/', upsert);
router.put('/', secure('update'),upsert);


//implementar la logica de rutas en funciones

function list(req,res){
    Controller.list()
    .then((list) =>{
        response.success(req, res, list, 200);
    })
    .catch((err) => {
        response.error(req, res, err.message, 500);
    });
}

function get(req, res){
    Controller.get(req.params.id)
    .then((list)=>{
        response.success(req,res,list,200);
    })
    .catch((err)=> {
        response.error(req, res, err.message, 500);
    });
}

function upsert(req, res){
    Controller.upsert(req.body)
    .then((user)=>{
        response.success(req,res,user,201);
    })
    .catch((err)=> {
        response.error(req, res, err.message, 500);
    });
}

module.exports = router;