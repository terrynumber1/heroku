var mongoose = require('mongoose');

var dbURI = 'mongodb://localhost/Loc8r';

// Switching dbURI between PRODUCTION and DEVELOPMENT mode
if (process.env.NODE_ENV === 'production') {
    dbURI = 'mongodb://heroku_l8wns377:i2m2n6fokn8u7ia75gpbgt19n8@ds027335.mongolab.com:27335/heroku_l8wns377'
}

mongoose.connect(dbURI);

// This will emit the SIGINT signal on Windows PC to capture and close anything before the process ends.
var readLine = require("readline");
if (process.platform === "win32") {
    var rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on("SIGINT", function () {
        process.emit("SIGINT");
    });
}

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to: ' + dbURI);
});

mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

gracefulShutdown = function (msg, callback) {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through ' + msg);
    });
};

// For nodemon restarts
process.once('SIGUSR2', function () {
    gracefulShutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});

// For app termination
process.on('SIGINT', function () {
    gracefulShutdown('app termination', function () {
        process.exit(0);
    });
});

// For Heroku app termination
process.on('SIGTERM', function () {
    gracefulShutdown('Heroku app shutdown', function () {
        process.exit(0);
    });
});

require('./locations');
    // locations.js