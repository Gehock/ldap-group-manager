const passport = require('passport');
const util = require('util');
const config = require('./config')

function StrategyMock(options, verify) {
    this.name = 'mock';
}

user_obj = {
        _json: {
            preferred_username: "laines5@aalto.fi"
        }
    } || { "username": "johndoe" };

util.inherits(StrategyMock, passport.Strategy);

StrategyMock.prototype.authenticate = function authenticate(req) {
    console.log("mock.authenticate", user_obj)
    this.success( user_obj );
}

module.exports = StrategyMock;
