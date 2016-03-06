var express = require('express');
var router = express.Router();
var ctrlLocations = require('../controllers/locations.js');
var ctrlOthers = require('../controllers/others.js');

// app_server

// ctrlOthers = require('../controllers/others.js');
// module.exports.angularApp = function (req, res)
router.get('/', ctrlOthers.angularApp);


// page 217, bottom of the page, add :locationid
router.get('/location/:locationid', ctrlLocations.locationInfo);

// page 227, 7.4.1
router.get('/location/:locationid/reviews/new', ctrlLocations.addReview);

// page 227, 7.4.1
router.post('/location/:locationid/reviews/new', ctrlLocations.doAddReview);


/* Other.javascripts pages */
router.get('/about', ctrlOthers.about);

module.exports = router;
