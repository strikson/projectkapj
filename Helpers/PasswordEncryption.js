const bcrypt = require('bcrypt');

module.exports = {

    verifyPassword : function (password, hash) {
        if (bcrypt.compareSync(password, hash)) {
            return true;
        }
        return false;
    },

};