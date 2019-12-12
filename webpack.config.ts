const path = require('path');

module.exports = {
    entry: {
        contentScript: './src/contentscripts/contentScript.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build'),
    },
}