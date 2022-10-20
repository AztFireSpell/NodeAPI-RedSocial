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

router.post('/follow/:id',secure('follow'), follow);
//implementar la logica de rutas en funciones

function list(req,res,next){
    Controller.list()
    .then((list) =>{
        response.success(req, res, list, 200);
    })
    .catch(next);
}

function get(req, res, next){
    Controller.get(req.params.id)
    .then((list)=>{
        response.success(req,res,list,200);
    })
    .catch(next);
}

function upsert(req, res, next){
    Controller.upsert(req.body)
    .then((user)=>{
        response.success(req,res,user,201);
    })
    .catch(next);
}

function follow(req, res, next){
    Controller.follow(req.user.data.id, req.params.id)
    .then(data => {
        response.success(req,res,data,201);
    })
    .catch(err => {
        if(err.errno==1062){
            response.error(req,res,'Ya sigues a este usuario',409);
        }else{
            next(err);
        }
    });
}

module.exports = router;