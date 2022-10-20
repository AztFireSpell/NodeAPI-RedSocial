const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error');


const secret = config.jwt.secret;

function sign(data){
    return jwt.sign({data}, secret);
}

function verify(token){
    return jwt.verify(token, secret)
}

const check = {
    own: function(req, owner){
        const tokendecode= decodeHeader(req);

        //comprobar si es o no propio el perfil
        if(tokendecode.data.id !== owner){
            throw error('No puedes editar este elemento', 401);
        }
    },
    logged: function(req, owner){
        const tokendecode= decodeHeader(req);
    },

}

function getToken(auth){
    //Bearer suadsdj817y3rh2832
    if(!auth){
        throw error('No viene el token',401);
    }

    if(auth.indexOf('Bearer ') === -1){
        throw error('Formato Invalido',401);
    }

    let token = auth.replace('Bearer ', '');

    return token;
}

function decodeHeader(req){
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;

    return decoded;
}

module.exports = {
    sign,
    check,
};