const passport = require('passport');
const util = require('util');
const config = require('./config')

function StrategyMock(options, verify) {
    this.name = 'mock';
}

user_obj = {
        _json: {
            preferred_username: ""
        }
    } || { "username": "johndoe" };

util.inherits(StrategyMock, passport.Strategy);

StrategyMock.prototype.authenticate = function authenticate(req) {
    this.success( user_obj );
}

module.exports = StrategyMock;
