const express = require('express');
const messagesHelper = require('../Helpers/MessagesHelper');
let router = express.Router();

router.get('/', function(req, res, next) {

    messagesHelper.findAll(req.query.firstUser, req.query.secondUser, (result) => {
        res.send(result);
    });

});

router.post('/', function(req, res, next) {

    let newMessage = {
        "sender": req.user.username,
        "receiver": req.body.receiver,
        "date": new Date(),
        "content": req.body.content,
    };

    messagesHelper.create(newMessage, (createdMessage) => {
        res.send(createdMessage);
    });

});

module.exports = router;