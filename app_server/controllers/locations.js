

/* Get homelist page */
module.exports.homelist = function (req, res) {
    res.render('locations-list', {title: 'Home'});
        // locations-list.jade
};

/* Get locationInfo page */
module.exports.locationInfo = function (req, res) {
    res.render('index', {title: 'Location Info'});
};

/* Get addReview page */
module.exports.addReview = function (req, res) {
    res.render('index', {title: 'Add review'});
};