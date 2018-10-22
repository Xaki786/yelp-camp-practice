const router = require("express").Router({ mergeParams: true });
const Campground = require("../models/Campground.js");
const Comment = require("../models/Comment.js");
// const isLoggedIn = require("../middlewares/auth").isLoggedIn;

// =====================================================================
// @route   GET    /campgrounds
// @desc    RETRIEVE ALL CAMPGROUNDS FROM DATABASE AND DISPLAY THEM
// @access  PUBLIC
// =====================================================================
router.get("/", (req, res) => {
  Campground.find()
    .then(dbCampgrounds => {
      res.render("./campgrounds/campgrounds.ejs", {
        ejsCampgrounds: dbCampgrounds
      });
    })
    .catch(err => console.log("Database error while finding campgrounds"));
});

// =====================================================================
// @route   GET    /campgrounds/new
// @desc    SHOW NEW CAMPGROUND FORM
// @access  PROTECTED
router.get("/new", isLoggedIn, (req, res) => {
  res.render("./campgrounds/new-campground.ejs");
});
// =====================================================================
// @route   POST    /campgrounds
// @desc    ADD NEW CAMPGROUND TO THE DATABASE
// @access  PRIVATE

router.post("/", isLoggedIn, (req, res) => {
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

// =====================================================================
// @route   GET    /campgrounds/:campgroundId
// @desc    RETRIEVE SPECIFIC CAMPGROUND FROM DATABASE AND DISPLAY IT
// @access  PUBLIC

router.get("/:campgroundId", (req, res) => {
  Campground.findById(req.params.campgroundId)
    .populate("comments")
    .exec((err, dbCampground) => {
      res.render("campgrounds/campground.ejs", {
        ejsCampground: dbCampground
      });
    });
});

// =====================================================================
// @route   GET    /campgrounds/:campgroundId/edit
// @desc    RETRIEVE SPECIFIC CAMPGROUND FROM DATABASE AND DISPLAY CAMPGROUND EDIT FORM
// @access  PROTECTED

router.get("/:campgroundId/edit", isLoggedIn, (req, res) => {
  Campground.findById(req.params.campgroundId)
    .then(dbCampground => {
      res.render("campgrounds/edit-campground.ejs", {
        ejsCampground: dbCampground
      });
    })
    .catch(err => {
      return res.status(400).json({ msg: err.name });
    });
});
// ===========================================================================
// @route   PUT    /campgrounds/:campgroundId
// @desc    UPDATE CAMPGROUND IN THE DATABASE AND REDIRECT TO THE SHOW PAGE
// @access  PRIVATE

router.put("/:campgroundId", isLoggedIn, (req, res) => {
  const newCampground = { ...req.body.campground };
  Campground.findByIdAndUpdate(req.params.campgroundId, newCampground)
    .then(() => {
      res.redirect("/campgrounds/" + req.params.campgroundId);
    })
    .catch(err => res.status(400).json({ msg: "Can not update a campground" }));
});

// =============================================================================================
// @route   DELETE    /campgrounds/:campgroundId
// @desc    DELETE SPECIFIC CAMPGROUND FROM DATABASE AND REDIRECT TO THE CAMPGROUNDS PAGE
// @access  PUBLIC

router.delete("/:campgroundId", isLoggedIn, (req, res) => {
  Campground.findById(req.params.campgroundId)
    .then(dbCampground => {
      dbCampground.comments.forEach(comment => {
        Comment.findByIdAndRemove(comment, function(err) {
          if (err) {
            console.log(err);
          }
        });
      });
      dbCampground.save().then(() => {
        Campground.findByIdAndRemove(req.params.campgroundId).then(() => {
          res.redirect("/campgrounds");
        });
      });
    })
    .catch(err => console.log("Campground Not Found", err));
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
module.exports = router;
