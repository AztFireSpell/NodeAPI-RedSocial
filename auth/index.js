const jwt = require('jsonwebtoken');
const config = require('../config');
const secret = config.jwt.secret;

function sign(data){
    return jwt.sign(data, secret);
}

function verify(token){
    return jwt.verify(token, secret)
}

const check = {
    own: function(req, owner){
        const tokendecode= decodeHeader(req);
        console.log(tokendecode);

        //comprobar si es o no propio el perfil
        if(tokendecode.id !== owner){
            throw new Error('No puedes editar este elemento');
        }
    },
}

function getToken(auth){
    //Bearer suadsdj817y3rh2832
    if(!auth){
        throw new Error('No viene el token');
    }

    if(auth.indexOf('Bearer ') === -1){
        throw new Error('Formato Invalido');
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