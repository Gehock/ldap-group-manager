const fs = require('fs');
const _ = require('lodash')

let config = require('./config-common');

// Merge (overwrite) with any local settings
if (fs.existsSync('./config-local.js')) {
    config = _.merge(config, require('./config-local'))
    module.exports = config;
} else {
	module.exports = config;
}