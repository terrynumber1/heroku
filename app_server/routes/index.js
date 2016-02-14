var express = require('express');
var router = express.Router();

var ctrlLocations = require('../controllers/locations');
                 // app_server/controllers/locations.js
var ctrlOthers = require('../controllers/others');
                // app_server/controllers/others.js


/* Locations pages */
router.get('/', ctrlLocations.homelist);
// app_server/controllers/locations.js >> homelist = function(){}

router.get('/location/', ctrlLocations.locationInfo);
// app_server/controllers/locations.js >> locationInfo = function(){}

router.get('/location/review/new/', ctrlLocations.addReview);
// app_server/controllers/locations.js >> addReview = function(){}


/* Other pages */
router.get('/about', ctrlOthers.about);

module.exports = router;

