const router = require("express").Router({ mergeParams: true });
const User = require("../models/User.js");
const passport = require("passport");

// =====================================================================
// @route   GET    /
// @desc    SHOW LANDING PAGE TO THE USER
// @access  PUBLIC
// =====================================================================
router.get("/", (req, res) => {
  res.render("index.ejs");
});

router.get("/register", (req, res) => {
  res.render("./users/new-user.ejs");
});
router.post("/register", (req, res) => {
  User.register(new User({ username: req.body.username }), req.body.password)
    .then(() => {
      passport.authenticate("local")(req, res, () => {
        return res.redirect("/campgrounds");
      });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ msg: err.name });
    });
});
router.get("/login", (req, res) => {
  res.render("./users/login.ejs");
});
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
  }),
  (req, res) => {
    res.redirect("/campgrounds");
  }
);
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/campgrounds");
});
module.exports = router;
