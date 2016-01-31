var express = require('express');
var router = express.Router();

var ctrlLocations = require('../controllers/locations');
                 // app_server/controllers/locations.js
var ctrlOthers = require('../controllers/others');
                // app_server/controllers/others.js


/* Locations pages */
router.get('/', ctrlLocations.homelist);
router.get('/location', ctrlLocations.locationInfo);
router.get('/location/review/new', ctrlLocations.addReview);

/* Other pages */
router.get('/about', ctrlOthers.about);

module.exports = router;
