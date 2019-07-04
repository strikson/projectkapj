
const fs = require('fs');
const path = require('path');

module.exports = {

    create : function (location, callback) {

        fs.readFile(path.resolve(__dirname, '../Database/Locations.json'), function (err, data) {
            let locations = JSON.parse(data);
            locations.push(location);

            fs.writeFile(path.resolve(__dirname, '../Database/Locations.json'), JSON.stringify(locations) , (err, data) => {
                callback(location);
            });

        });


    },

    findAll : function (callback) {
        fs.readFile(path.resolve(__dirname, '../Database/Locations.json') , (err, data) => {
            if (err) throw err;
            let locations = JSON.parse(data);
            callback(locations);
        });

    },
};
