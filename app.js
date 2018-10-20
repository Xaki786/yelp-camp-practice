const express = require("express");
const mongoose = require("mongoose");
const Campground = require("./models/Campground.js");
const Comment = require("./models/Comment.js");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const app = express();
const path = require("path");
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

// ROUTES MIDDLEWARES
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:campgroundId/comments", commentRoutes);

//  SERVER STARTUP
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`SERVER STARTED AT PORT ${PORT}`);
});
