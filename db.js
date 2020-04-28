const mongoose = require('mongoose');
const fs = require('fs');
const config = require('./config');

mongoose.connect(config.MONGO_URL, {
    useNewUrlParser: true,
    auth: {
        authdb: config.MONGO_AUTHDB,
        user: config.MONGO_USERNAME,
        password: config.MONGO_PW
    }
});

const db = mongoose.connection;

db.on("error", () => {
    console.log("> error occurred from the database");
});
db.once("open", () => {
    console.log("> successfully opened the database");
});

module.exports = mongoose;