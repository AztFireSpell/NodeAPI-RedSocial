const express = require('express');

const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

router.get('/', function(req, res){
    Controller.list()
    .then((list) =>{
        response.success(req, res, list, 200);
    })
    .catch((err) => {
        response.error(req, res, err.message, 500);
    });
    
});

router.get('/:id', function(req, res){
    Controller.get(req.params.id)
    .then((list)=>{
        response.success(req,res,list,200);
    })
    .catch((err)=> {
        response.error(req, res, err.message, 500);
    });
});

module.exports = router;