var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.reviewsCreate = function() {};
module.exports.reviewsReadOne = function() {};
module.exports.reviewsUpdateOne = function() {};
module.exports.reviewsDeleteOne = function() {};