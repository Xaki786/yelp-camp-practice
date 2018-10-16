const express = require("express");
const mongoose = require("mongoose");
const Campground = require("./models/Campground.js");
const Comment = require("./models/Comment.js");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const app = express();
const path = require("path");

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
    process.exit(-1);
  });

// const seedDB = require("./seedDB");
// seedDB();
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//  LANDING PAGE
app.get("/", (req, res) => {
  res.render("index.ejs");
});

// ===================================================================
//  CAMPGROUNDS
// ===================================================================
//  SHOW ALL CAMPGROUNDS
app.get("/campgrounds", (req, res) => {
  Campground.find()
    .then(dbCampgrounds => {
      res.render("./campgrounds/campgrounds.ejs", {
        ejsCampgrounds: dbCampgrounds
      });
    })
    .catch(err => console.log("Database error while finding campgrounds"));
});

//  ADD NEW CAMPGROUND THROUGH MODAL FORMS
app.post("/campgrounds", (req, res) => {
  const newCampground = { ...req.body.campground };
  if (newCampground.name === "") {
    return res.status(400).json({ msg: "Campground can not be empty" });
  }
  Campground.create(newCampground)
    .then(dbCampground => {
      res.redirect("/campgrounds");
    })
    .catch(err =>
      res.status(400).json({ msg: "Can not create a new campground" })
    );
});

//  SHOW SPECIFIC CAMPGROUND
app.get("/campgrounds/:campgroundId", (req, res) => {
  Campground.findById(req.params.campgroundId)
    .populate("comments")
    .exec((err, dbCampground) => {
      res.render("campgrounds/campground.ejs", {
        ejsCampground: dbCampground
      });
    });
});

//  UPDATE CAMPGROUND THROUGH FORM MODAL
app.put("/campgrounds/:campgroundId", (req, res) => {
  const newCampground = { ...req.body.campground };
  Campground.findByIdAndUpdate(req.params.campgroundId, newCampground)
    .then(() => {
      res.redirect("/campgrounds/" + req.params.campgroundId);
    })
    .catch(err => res.status(400).json({ msg: "Can not update a campground" }));
});

//  DELETE CAMPGROUND
app.delete("/campgrounds/:campgroundId", (req, res) => {
  Campground.findByIdAndRemove(req.params.campgroundId)
    .then(() => {
      res.redirect("/campgrounds");
    })
    .catch(err =>
      res.status(400).json({ msg: "Campground can not be deleted" })
    );
});

// ===================================================================
//  COMMENTS
// ===================================================================
app.get("/campgrounds/:campgroundId/comments/new", (req, res) => {
  res.render("comments/new-comment.ejs", {
    campgroundId: req.params.campgroundId
  });
});
app.post("/campgrounds/:campgroundId/comments/", (req, res) => {
  const comment = req.body.comment;
  console.log(comment);
  Campground.findById(req.params.campgroundId)
    .then(dbCampground => {
      Comment.create(comment).then(dbComment => {
        dbCampground.comments.push(dbComment);
        dbCampground.save().then(() => {
          res.redirect("/campgrounds/" + req.params.campgroundId);
        });
      });
    })
    .catch(err => console.log("Campground Not Found"));
});

//  SERVER STARTUP
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`SERVER STARTED AT PORT ${PORT}`);
});
