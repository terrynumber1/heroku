var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.locationsListByDistance = function(req, res) {
    //res.status(200);
    //res.json({"status": "success"});

    // Copy code from listing 6.4 page 186

    sendJSONresponse(res, 200, {"status": "success"});
};

module.exports.locationsCreate = function(req, res) {
    //res.status(200);
    //res.json({"status": "success"});
    //sendJSONresponse(res, 200, {"status": "post successful"});

    // Listing 6.5

    Loc.create({
        name: req.body.name,
        address: req.body.address,
        facilities: req.body.facilities.split(","),
        coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
        openingTimes: [{
            days: req.body.days1,
            opening: req.body.opening1,
            closing: req.body.closing1,
            closed: req.body.closed1
        }, {
            days: req.body.days2,
            opening: req.body.opening2,
            closing: req.body.closing2,
            closed: req.body.closed2
        }]
    }, function(err, location) {
            if (err) {
                console.log(err);
                sendJSONresponse(res, 400, err);
            } else {
                console.log(locatin);
                sendJSONresponse(res, 201, location);
            }
        }
    );
};

// page 177
module.exports.locationsReadOne = function(req, res) {
    //sendJSONresponse(res, 200, {"status": "success readone"});
    // "_id": "56c6e2abf856c2a4aa02d061"

    if (req.params && req.params.locationid) {

        Loc.findById(req.params.locationid)
            .exec(function (err, location) {
                if (!location) {
                    sendJSONresponse(res, 404, {"message": "locationid not found"});
                    return; // exit the function
                } else if (err) {
                    sendJSONresponse(res, 404, err);
                    return; // exit the function
                }

                sendJSONresponse(res, 200, location);

            });
    } else {
        sendJSONresponse(res, 404, {"message": "No locationid in request"});
    }


};
module.exports.locationsUpdateOne = function() {};
module.exports.locationsDeleteOne = function() {};