const fs = require('fs');
const path = require('path');
const passwordEncryption = require('../Helpers/PasswordEncryption');

module.exports = {

    getUserByUsername : function (username, callback) {
        fs.readFile(path.resolve(__dirname, '../Database/Users.json') , (err, data) => {
            if (err) throw err;
            let users = JSON.parse(data);

            for(var i = 0; i < users.length; i++) {
                if (users[i].username === username) {
                    callback(users[i]);
                    return;
                }
            }

            callback(null);

        });
    },

    validationUser : function (username, password, callback) {
        this.getUserByUsername(username, (user) => {
            if (user != null && passwordEncryption.verifyPassword(password, user.password)) {
                callback(user);
            }  else {
                callback(null);
            }
        });
    },

    getUserById : function (userId, callback) {
        fs.readFile(path.resolve(__dirname, '../Database/Users.json') , (err, data) => {
            if (err) throw err;
            let users = JSON.parse(data);

            for(var i = 0; i < users.length; i++) {
                if (users[i].id === userId) {
                    callback(users[i]);
                    return;
                }
            }

            callback(null);

        });
    }
};