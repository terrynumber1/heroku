/* Get homelist page */
module.exports.homelist = function (req, res) {
    res.render('locations-list', {title: 'Home'});
        // locations-list.jade
};

/* Get locationInfo page */
module.exports.locationInfo = function (req, res) {
    res.render('location-info', {title: 'Location Info'});
            // location-info.jade
};

/* Get addReview page */
module.exports.addReview = function (req, res) {
    res.render('location-review-form', {title: 'Add review'});
            // location-review-form.jade
};
