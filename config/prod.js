const {
    COSMOS_DB_HOST,
    COSMOS_DB_PORT,
    COSMOS_DB_USERNAME,
    COSMOS_DB_PRIMARY_PASSWORD,
    COSMOS_DB_SECONDARY_PASSWORD,
    COSMOS_DB_PRIMARY_CONNECTION_STRING,
    COSMOS_DB_SECONDARY_CONNECTION_STRING,
    COSMOS_DB_SSL,
    SESS_SECRET,
    COOKIE_NAME,
    IS_PROD,
} = require("./config");

const MAX_AGE = 1000 * 60 * 60 * 3; // Three hours

// CosmosDB:
const MONGO_URI = `mongodb://${COSMOS_DB_USERNAME}:${COSMOS_DB_PRIMARY_PASSWORD}@${COSMOS_DB_HOST}:${COSMOS_DB_PORT}/?ssl=${COSMOS_DB_SSL}&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@${COSMOS_DB_USERNAME}@`;

module.exports = {
    host: COSMOS_DB_USERNAME,
    port: COSMOS_DB_PORT,
    mongoURI: MONGO_URI,
    maxAge: MAX_AGE,
    sessionSecret: SESS_SECRET,
    cookieName: COOKIE_NAME,
    isProd: IS_PROD,
};