var express = require('express');
var router = express.Router();
var ctrlLocations = require('../controllers/locations.js');
var ctrlOthers = require('../controllers/others.js');

// app_server
/* Locations.js pages */
router.get('/', ctrlLocations.homelist);
router.get('/location', ctrlLocations.locationInfo);
router.get('/location/review/new', ctrlLocations.addReview);

/* Other.js pages */
router.get('/about', ctrlOthers.about);

module.exports = router;
