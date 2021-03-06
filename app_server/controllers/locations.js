var request = require('request');
// request(options, callback);

var apiOptions = {server: 'http://localhost:3000'};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server = 'https://wireapp1.herokuapp.com';
}


var renderHomepage = function (req, res, responseBody) {
    // http://localhost:3000

    // Listing 7.8 page 213

    res.render('locations-list.jade', {
        title: 'Loc8r - find a place to work with wifi',
        pageHeader: {
            title: 'Loc8r',
            strapline: 'Find places to work with wifi near you!'
        },
        sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for."
        //message: message    // Listing 7.8 page 213
    });
};

/* GET 'home' page */
module.exports.homelist = function(req, res) {
    renderHomepage(req, res);
};

/* GET 'Location info' page */
module.exports.locationInfo = function(req, res) {

    getLocationInfo(req, res, function (req, res, responseData) {
        renderDetailPage(req, res, responseData);
    });

};

var getLocationInfo = function (req, res, callback) {
    var requestOptions, path;
    path = '/api/locations/' + req.params.locationid;
    requestOptions = {
        url: apiOptions.server + path, // var apiOptions = {server: 'http://localhost:3000'};
        method: 'GET',
        json: {}
    };

    request(requestOptions, function (err, response, body) {
        var data = body;
        if (response.statusCode === 200) {

            console.log(body.coords[0]);
            console.log(body.coords[1]);

            data.coords = {
                lng: body.coords[0],
                lat: body.coords[1]
            };



            callback(req, res, data);
        } else {
            _showError(req, res, response.statusCode); // page 225, listing 7.17
        }
    });
};

// page 220, Listing 7.14
var renderDetailPage = function (req, res, locDetail) {
    res.render('location-info.jade', {
        title: locDetail.name,
        pageHeader: {
            title: locDetail.name
        },
        sidebar: {
            context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
            callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
        },
        location: locDetail
    });
};

// page 225, Listing 7.17
var _showError = function (req, res, status) {
    var title, content;
    if (status === 404) {
        title = '404, page note found';
        content = "Oh dear, we can't find this page, sorry";
    } else {
        title = status + ", something went wrong";
        content = "Something had gone wrong";
    }

    res.status(status);
    res.render('generic-text', {
        title: title,
        content: content
    });
};

/* GET 'Add review' page */
module.exports.addReview = function (req, res) {

    getLocationInfo(req, res, function (req, res, responseData) {
        renderReviewForm(req, res, responseData);
    });

};

// page 231, listing 7.20
var renderReviewForm = function (req, res, locDetail) {
    res.render('location-review-form.jade', {
        title: 'Review  ' + locDetail.name + ' on Loc8r',
        pageHeader: { title: 'Review ' + locDetail.name },
        error: req.query.err
    });

};

/* POST a new review */
module.exports.doAddReview = function (req, res) {
    var requestOptions, path, locationid, postdata;
    locationid = req.params.locationid;
    path = '/api/locations/' + locationid + '/reviews';
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>   ' + path);

    postdata = {
        author: req.body.name,
        rating: parseInt(req.body.rating, 10),
        reviewText: req.body.review
    };

    requestOptions = {
        url: apiOptions.server + path,  // apiOptions.server = 'https://wireapp1.herokuapp.com';
        method: 'POST',
        json: postdata
    };

    if ( !postdata.author || !postdata.rating || !postdata.reviewText ) {
        res.redirect('/location/' + locationid + '/reviews/new?err=val');
    } else {
        request(requestOptions, function(err, response, body) {
            if (response.statusCode === 201) {
                res.redirect('/location/' + locationid); // redirect user to homepage
            } else if ( response.statusCode === 400 && body.name && body.name === 'ValidationError' ) {
                res.redirect('/location/' + locationid + '/reviews/new?err=val');
            } else {
                _showError(req, res, response.statusCode);
            }
        });
    }

};