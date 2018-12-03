const path = require('path');
//const isomorphicConfig = require('isomorphic-config');

const config = {

    env: process.env.NODE_ENV || 'development',

    // ----------------------------------
    // Project Structure
    // ----------------------------------
    path_base: path.resolve(__dirname, '..'),
    dir_client: 'scss',
    dir_dist: 'dist',
    dir_public: 'public',
    dir_test: 'tests',

    // ----------------------------------
    // Compiler Configuration
    // ----------------------------------
    compiler_devtool         : 'source-map',
    compiler_public_path     : '../dist/', //isomorphicConfig.client.cdn_static_url + "/",

    build_number: process.env.CIRCLE_BUILD_NUM
};


// ------------------------------------
// Environment
// ------------------------------------
config.globals = {
    'process.env'  : {
        'NODE_ENV' : JSON.stringify(config.env),
        'CIRCLE_BUILD_NUM' : JSON.stringify(config.build_number)
    },
    'NODE_ENV'     : config.env,
    '__DEV__'      : config.env === 'development',
    '__PROD__'     : config.env === 'production',
    '__TEST__'     : config.env === 'test',
    '__BASENAME__' : JSON.stringify(process.env.BASENAME || '')
};

// ------------------------------------
// Utilities
// ------------------------------------
function base () {
    const args = [config.path_base].concat([].slice.call(arguments));
    return path.resolve.apply(path, args)
}

config.paths = {
    base   : base,
    client : base.bind(null, config.dir_client),
    public : base.bind(null, config.dir_public),
    dist   : base.bind(null, config.dir_dist),
};

module.exports = config;
