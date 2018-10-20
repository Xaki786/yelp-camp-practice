const router = require("express").Router({ mergeParams: true });

// =====================================================================
// @route   GET    /
// @desc    SHOW LANDING PAGE TO THE USER
// @access  PUBLIC
// =====================================================================
router.get("/", (req, res) => {
  res.render("index.ejs");
});

module.exports = router;
