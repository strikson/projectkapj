const fs = require('fs');
const path = require('path');

module.exports = {

    create : function (message, callback) {

        fs.readFile(path.resolve(__dirname, '../Database/Messages.json'), function (err, data) {
            let messages = JSON.parse(data);
            messages.push(message);

            fs.writeFile(path.resolve(__dirname, '../Database/Messages.json'), JSON.stringify(messages) , (err, data) => {
                callback(message);
            });

        });

    },

    findAll : function (firstUser, secondUser, callback) {
        fs.readFile(path.resolve(__dirname, '../Database/Messages.json') , (err, data) => {
            if (err) throw err;
            let messages = JSON.parse(data);
            let result = [];
            for(var i = 0; i < messages.length; i++) {
                if ((messages[i].sender === firstUser && messages[i].receiver === secondUser) ||
                    (messages[i].receiver === firstUser && messages[i].sender === secondUser)) {
                    result.push(messages[i]);
                }
            }

            callback(result);
        });
    },
};