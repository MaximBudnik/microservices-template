module.exports = {
    PORT: 3002,
    NAME: 'service',
    FILENAME: 'service.js',
    EXPOSES: {
        './Service': './src/Service',
    }
}
