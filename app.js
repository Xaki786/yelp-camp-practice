const express = require("express");
const mongoose = require("mongoose");
const Campground = require("./models/Campground.js");
const Comment = require("./models/Comment.js");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const methodOverride = require("method-override");
const app = express();
const path = require("path");
const User = require("./models/User.js");
const campgroundRoutes = require("./routes/campground-routes.js");
const commentRoutes = require("./routes/comment-routes.js");
const indexRoutes = require("./routes/index-routes.js");

const mongoUri = "mongodb://localhost/yelp-camp-practice";
mongoose
  .connect(
    mongoUri,
    {
      useNewUrlParser: true
    }
  )
  .then(() => {
    console.log("Mongo DB Connected");
  })
  .catch(err => {
    console.log("CAN'T CONNECT TO THE DATABASE");
  });

// const seedDB = require("./seedDB");
// seedDB();
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// =====================================================================
//  PASSPORT CONFIGURATION
// =====================================================================
app.use(
  expressSession({
    secret: "Rarey",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// =====================================================================
// ROUTES MIDDLEWARES
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:campgroundId/comments", commentRoutes);

//  SERVER STARTUP
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`SERVER STARTED AT PORT ${PORT}`);
});
