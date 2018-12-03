const debug = require('debug')('app:bin:compile');
const project = require('./config');
let config = null;

if(project.env === 'development') {
    debug('Load Webpack development Config');
    config = require('./webpack.dev.config.js');
} else {
    debug('Load Webpack production Config');
    config = require('./webpack.prod.config.js');
}

module.exports = config;