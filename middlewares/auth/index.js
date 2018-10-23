const Campground = require("../../models/Campground.js");
module.exports = {
  isLoggedIn: (req, res, next) => {
    if (req.isAuthenticated) {
      return next();
    }
    res.redirect("/login");
  },
  checkCampgroundOwnership: (req, res, next) => {
    if (req.isAuthenticated()) {
      Campground.findById(req.params.campgroundId).then(dbCampground => {
        if (dbCampground.author.id.equals(req.user.id)) {
          return next();
        }
        res.redirect("back");
      });
    } else {
      res.redirect("/login");
    }
  }
};
