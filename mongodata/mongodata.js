// Paste this into MongoDB shell
// create folders c:\data\db

// Chapter 5

db.locations.save({
    name: 'Starcups',
    address: '125 High Street, Reading, RG6 1PS',
    rating: 3,
    facilities: ['Hot drinks', 'Food', 'Premium wifi'],
    coords: [-0.9690884, 51.455041],
    openingTimes: [{
        days: 'Monday - Friday',
        opening: '7:00am',
        closing: '7:00pm',
        closed: false
    }, {
        days: 'Saturday',
        opening: '8:00am',
        closing: '5:00pm',
        closed: false
    }, {
        days: 'Sunday',
        closed: true
    }]
});

db.locations.update({
    name: 'Starcups'
    }, {
        $push: {
            reviews: {
                author: 'Simon Holmes',
                id: ObjectId(),
                rating: 5,
                timestamp: new Date("Jul 16, 2013"),
                reviewText: "What a great place. I can't say enough good things about it."
        }
    }
});

// mongodb://heroku_l8wns377:i2m2n6fokn8u7ia75gpbgt19n8@ds027335.mongolab.com:27335/heroku_l8wns377
// server: ds027335.mongolab.com
// user: heroku_l8wns377
// password: i2m2n6fokn8u7ia75gpbgt19n8
// port: 27335
// databasename: heroku_l8wns377

// http://wireapp1.herokuapp.com/