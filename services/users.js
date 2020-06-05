const ModelUser = require('../utils/schema/user');
const ModelTablero = require('../utils/schema/tablero');

class UserService {
    postUser(req, res){
        return new Promise((resolve, reject) => {
            let isUser = true;
            resolve(isUser);
        });
    }
}
module.exports = {
    UserService
};