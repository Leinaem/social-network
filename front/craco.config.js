const path = require('path');

module.exports = {
    webpack: {
        alias: {
            '~': path.resolve(__dirname, './src/'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@image': path.resolve(__dirname, './src/assets/image'),
            '@redux': path.resolve(__dirname, './src/redux'),
        }
    }
};