var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.reviewsCreate = function() {};

// Listing 6.3
module.exports.reviewsReadOne = function(req, res) {

    // location id 56c6e2abf856c2a4aa02d061
    // review id 56c6e326f856c2a4aa02d062

    console.log("Getting single review");

    if (req.params && req.params.locationid && req.params.reviewid) {
        Loc
            .findById(req.params.locationid)
            .select('name reviews')
            .exec(
            function(err, location) {
                console.log(location);
                var response, review;
                if (!location) {
                    sendJSONresponse(res, 404, {
                        "message": "locationid not found"
                    });
                    return;
                } else if (err) {
                    sendJSONresponse(res, 400, err);
                    return;
                }
                if (location.reviews && location.reviews.length > 0) {
                    //review = location.reviews.id(req.params.reviewid);
                    //review = req.params.reviewid;
                    //review = location.reviews.id;

                    // HERE
                    console.log('===============: ' + req.params.reviewid);
                    console.log('REVIEW ID :' + review);

                    if (!review) {
                        sendJSONresponse(res, 404, {
                            "message": "reviewid not found"
                        });
                    } else {
                        response = {
                            location: {
                                name: location.name,
                                id: req.params.locationid
                            },
                            review: review
                        };
                        sendJSONresponse(res, 200, response);
                    }
                } else {
                    sendJSONresponse(res, 404, {
                        "message": "No reviews found"
                    });
                }
            }
        );
    } else {
        sendJSONresponse(res, 404, {
            "message": "Not found, locationid and reviewid are both required"
        });
    }
};

module.exports.reviewsUpdateOne = function() {};
module.exports.reviewsDeleteOne = function() {};