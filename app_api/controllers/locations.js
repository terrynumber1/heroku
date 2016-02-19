var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.locationsListByDistance = function(req, res) {
    //res.status(200);
    //res.json({"status": "success"});

    sendJSONresponse(res, 200, {"status": "success"});
};

module.exports.locationsCreate = function(req, res) {
    //res.status(200);
    //res.json({"status": "success"});

    sendJSONresponse(res, 200, {"status": "post successful"});
};
module.exports.locationsReadOne = function(req, res) {
    //sendJSONresponse(res, 200, {"status": "success readone"});

    Loc.findById(req.params.locationid)
        .exec(function (err, location) {
            sendJSONresponse(res, 200, location);
        });
};
module.exports.locationsUpdateOne = function() {};
module.exports.locationsDeleteOne = function() {};