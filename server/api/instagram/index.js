var express = require('express');
var controller = require('instagramController');

var router = express.Router();

router.get('/', controller.findAll);
router.post('/', controller.createInstagram);
