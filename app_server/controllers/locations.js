var request = require('request');
// request(options, callback);

var apiOptions = {server: 'http://localhost:3000'};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server = 'https://wireapp1.herokuapp.com';
}


var renderHomepage = function (req, res, responseBody) {
    // http://localhost:3000

    // Listing 7.8 page 213
    var message;
    if ( !(responseBody instanceof Array) ) { // responseBody is not an array
        message = "API lookup error";
        responseBody = [];
    } else {
        if (!responseBody.length) { // responseBody array is empty
            message = "No places found nearby";
        }
    }

    res.render('locations-list.jade', {
        title: 'Loc8r - find a place to work with wifi',
        pageHeader: {
            title: 'Loc8r',
            strapline: 'Find places to work with wifi near you!'
        },
        sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for.",
        locations: responseBody, // an array of results from the database
        message: message    // Listing 7.8 page 213
    });
};

/* GET 'home' page */
module.exports.homelist = function(req, res) {
    var requestOptions, path;

    path = '/api/locations';

    requestOptions = {
        url: apiOptions.server + path,
        method: 'GET',
        json: {},
        qs: {
            lng: -0.9690884,
            lat: 51.455041,
            maxDistance: 20
        }
    };

    var _formatDistance = function (distance) {
        var numDistance, unit;
        if (distance > 1) {
            numDistance = parseFloat(distance).toFixed(1);
            unit = 'km';
        } else {
            numDistance = parseInt(distance * 1000,10);
            unit = 'm';
        }
        return numDistance + unit;
    };

    // request(option, callback);
    // Listing 7.6 page 210
    request(requestOptions, function (err, response, body) {
        var i, data;
        data = body;

        if ( response.statusCode === 200 && data.length ) {
            for (i=0; i<data.length; i++) {
                console.log('=== JIM DEBUG === ' + data[i].distance);
                data[i].distance = _formatDistance(data[i].distance);
            }
        }
        renderHomepage(req, res, data);
        //console.log('=== JIM DEBUG ===' + body);
    });

};

/* GET 'Location info' page */
module.exports.locationInfo = function(req, res) {

    var requestOptions, path;
    path = '/api/locations/' + req.params.locationid; // :locationid

    requestOptions = {
        url: apiOptions.server + path, // var apiOptions = {server: 'http://localhost:3000'};
        method: 'GET',
        json: {}
    };

    request( requestOptions, function(err, response, body) {
            var data = body;

            if (response.statusCode === 200) {
                console.log('HERE --======-----===--= : ' + data.coords);
                data.coords = {
                    lng: body.coords[0],
                    lat: body.coords[1]
                };
                renderDetailPage(req, res, data);
            } else {
                _showError(req, res, response.statusCode); // page 225, Listing 7.17
            }

        }
    );

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

    renderReviewForm(req, res);

};

var renderReviewForm = function (req, res) {
    res.render('location-review-form.jade', {
        title: 'Review Starcups on Loc8r',
        pageHeader: { title: 'Review Starcups' }
    });
};

/* POST a new review */
module.exports.doAddReview = function (req, res) {


};