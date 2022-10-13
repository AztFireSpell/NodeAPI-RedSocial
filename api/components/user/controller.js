const nanoid = require('nano-id');
const TABLE = 'user';

const auth = require('../auth');
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
    async function upsert(body){

        const user={
            name:body.name,
            username:body.username,
        }

        if (body.id){
            user.id = body.id;
        }else{
            user.id = nanoid();
        }

        if(body.password || body.username){
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: body.password,
            })
        }

        return store.upsert(TABLE, user);
    }

    return { 
        list,
        get,
        upsert
    };
}