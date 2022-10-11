const session = require("express-session");
const mongoose = require("mongoose");
const MongoDBStore = require("connect-mongodb-session")(session);
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const express = require("express");
const keys = require("./config/keys.js");
const app = express();
const router = express.Router();

// Setting up DB
mongoose
    .connect(keys.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connection to DataBase successful"))
    .catch((err) => console.error(err));

// // Setting up DB
// mongoose.connect(keys.mongoURI, {
//     useMongoClient: true,
// });

// setting up connect-mongodb-session store
const mongoDBstore = new MongoDBStore({
    uri: keys.mongoURI,
    collection: "users",
    // CosmosDB:
    databaseName: "PokerZone",
    expiresKey: `_ts`,
    expiresAfterSeconds: 60 * 60 * 24 * 14,
});

// Express Bodyparser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Morgan setup
app.use(morgan("dev"));

// Express-Session
app.use(
    session({
        name: keys.cookieName,
        secret: keys.sessionSecret,
        resave: true,
        saveUninitialized: false,
        store: mongoDBstore,
        cookie: {
            maxAge: keys.maxAge,
            sameSite: false,
            secure: keys.isProd,
        },
    })
);

app.use(helmet());

// Below corsOptions are for Local development
const corsOptions = {
    origin: "http://localhost:54903",
    credentials: true,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Below corsOptions work in deployment as Docker containers
const corsOptionsProd = {
    origin: "http://localhost",
    credentials: true,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

router.get("/", (req, res) => res.send("HELLO FRIEND"));

// Setup the API routes
if (keys.isProd) {
    // Production, routes mounted at /sessions-auth-app and not root domain
    app.use("/api/users", require("./routes/users"));
    // app.use("/api/auth", require("./routes/auth"));
} else {
    // Development
    app.use("/api/users", require("./routes/users"));
}

app.listen(keys.port, () =>
    console.log(`Server started on http://${keys.host}:${keys.port}`)
);