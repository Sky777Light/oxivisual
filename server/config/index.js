// process.env.NODE_ENV = 'production';

module.exports = {
    env: process.env.NODE_ENV,
    port: process.env.PORT || 3000,
    mongoose: {
        uri: "mongodb://localhost/oxivisual"
    },
    security: {
        secret: "t45g3w45r34tw5ye454uhdgdf",
        expiresIn: "24h"
    }
};