var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
    author: String,
    rating: {type: Number, required: true, min: 0, max: 5},
    reviewText: String,
    creaetdOn: {type: Date, "default": Date.now}
});

var openingTimeSchema = new mongoose.Schema({
    days: {type: String, required: true},
    opening: String,
    closing: String,
    closed: {type: Boolean, required: true}
});

var locationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: String,
    rating: { type: Number, "default": 0, min: 0, max: 5 },
    facilities: [String],
    coords: { type: [Number], index: '2dsphere' },

    // sub-documents
    openingTime: [openingTimeSchema],
    reviews: [reviewSchema]
});

mongoose.model('Location', locationSchema);
// (name of the model, schema to use)


//var URI = 'mongodb://heroku_l8wns377:i2m2n6fokn8u7ia75gpbgt19n8@ds027335.mongolab.com:27335/heroku_l8wns377'

//var host = ds027335.mongolab.com:27335;
//var databasename = heroku_l8wns377;
//var username = heroku_l8wns377;
//var password = i2m2n6fokn8u7ia75gpbgt19n8;