const express = require('express');
let locationsHelper = require('../Helpers/LocationsHelper');
let router = express.Router();

router.get('/', function(req, res, next) {

    locationsHelper.findAll((locations) => {
        res.send(locations);
    });

});

router.post('/', function(req, res, next) {

    let newLocation = {
        "person": req.user.username,
        "coordinate": {
            "latitude": req.body.latitude,
            "longitude": req.body.longitude
        },
        "createdAt": new Date()
    };

    locationsHelper.create(newLocation, (location) => {
        res.send(location);
    });

});

module.exports = router;