const nanoid = require('nano-id');
const TABLE = 'user';
//Controlador como una funcion utilizando injectedStore

module.exports = function (injectedStore){

    let store = injectedStore;

    if(!store){
        store = require('../../../store/dummy');
    }

    //Conversion a funciones asyncronas
    function list() {
        return store.list(TABLE);
    }

    function get(id) {
        return store.get(TABLE, id);
    }
    function upsert(body){

        const user={
            name:body.name
        }

        if (body.id){
            user.id = body.id;
        }else{
            user.id = nanoid();
        }

        return store.upsert(TABLE, user);
    }

    return { 
        list,
        get,
        upsert
    };
}