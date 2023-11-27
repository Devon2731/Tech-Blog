const express = require("express");
const session = require("express-session");
const sequelize = require("../config/connection");
const path = require("path");
const exphbs = require("express-handlebars");
const routes = require("../controllers");
const helpers = require("../utils/helpers");

const SequelizeStore = require("connect-session-sequelize")(session.Store);

// Initialize express app

const app = express();
const PORT = process.env.PORT || 3001;


// Set up sessions
const hbs = exphbs.create({ helpers });

const sess = {
    secret: "Super secret secret",
    cookie: {
        // Stored in milliseconds
        maxAge: 24 * 60 * 60 * 1000, // expires after 1 day
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sess));


// Import routes and give the server access to them
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

//Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () =>
        console.log(
            `\nServer running on port ${PORT}. Visit http://localhost:${PORT} and create an account!`
        )
    );
})