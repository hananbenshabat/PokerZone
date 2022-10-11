require("dotenv").config();

module.exports = {
    IS_PROD: process.env.NODE_ENV === "production",
    COSMOS_DB_HOST: process.env.COSMOS_DB_HOST,
    COSMOS_DB_PORT: process.env.COSMOS_DB_PORT,
    COSMOS_DB_USERNAME: process.env.COSMOS_DB_USERNAME,
    COSMOS_DB_PRIMARY_PASSWORD: process.env.COSMOS_DB_PRIMARY_PASSWORD,
    COSMOS_DB_SECONDARY_PASSWORD: process.env.COSMOS_DB_SECONDARY_PASSWORD,
    COSMOS_DB_PRIMARY_CONNECTION_STRING: process.env.COSMOS_DB_PRIMARY_CONNECTION_STRING,
    COSMOS_DB_SECONDARY_CONNECTION_STRING: process.env.COSMOS_DB_SECONDARY_CONNECTION_STRING,
    COSMOS_DB_SSL: process.env.COSMOS_DB_SSL,
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_CLUSTER: process.env.DB_CLUSTER,
    DB_NAME: process.env.DB_NAME,
    SESS_SECRET: process.env.SESS_SECRET,
    COOKIE_NAME: process.env.COOKIE_NAME,
};