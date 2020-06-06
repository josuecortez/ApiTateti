const ModelUser = require('../schema/schemaUser');
const ModelTablero = require('../schema/schemaTablero');

class UserService {
    postUser(name, res){
        return new Promise((resolve, reject) => {
            let objectId = getObjectId();
            console.log(objectId);
            const userJson = {
                _id: objectId,
                nombre:name,
                ganador: false
            };
            const user = new ModelUser(userJson);
            user.save();
            resolve(userJson);
        });
    };
     getOneUser(idUser){
        return  new Promise((resolve, rejected) => {
            try {
                const user =  ModelUser.find({_id: idUser});
                resolve(user);
            } catch (error) {
                rejected(error);
            }
        })
    };
    getAllUser(){
        return new Promise((resolve,rejected)=> {
            try {
                const users =  ModelUser.find({});
                resolve(users);
            } catch (error) {
                rejected(error);
            }
        });
    };
}
function getObjectId() {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
};
module.exports = {
    UserService
};