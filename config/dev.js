const {
    COSMOS_DB_HOST,
    COSMOS_DB_PORT,
    COSMOS_DB_USERNAME,
    COSMOS_DB_PRIMARY_PASSWORD,
    COSMOS_DB_SSL,
    HOST,
    PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_CLUSTER,
    DB_NAME,
    SESS_SECRET,
    COOKIE_NAME,
    IS_PROD,
} = require("./config");

const MAX_AGE = 1000 * 60 * 60 * 3; // Three hours

// MongoDB:
const MONGO_URI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_CLUSTER}.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

// CosmosDB:
// const MONGO_URI = `mongodb://${COSMOS_DB_USERNAME}:${COSMOS_DB_PRIMARY_PASSWORD}@${COSMOS_DB_HOST}:${COSMOS_DB_PORT}/?ssl=${COSMOS_DB_SSL}&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@${COSMOS_DB_USERNAME}@`;

module.exports = {
    host: HOST,
    port: PORT,
    mongoURI: MONGO_URI,
    maxAge: MAX_AGE,
    sessionSecret: SESS_SECRET,
    cookieName: COOKIE_NAME,
    isProd: IS_PROD,
};