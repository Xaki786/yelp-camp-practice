const Campground = require("../models/Campground.js");
const Comment = require("../models/Comment.js");
const router = require("express").Router({ mergeParams: true });

// =====================================================================
// @route   GET    /campgrounds/:campgroundId/comments/new
// @desc    RETRIEVE DATA FROM DATABASE AND SHOW NEW COMMENT PAGE
// @access  PROTECTED
// =====================================================================
router.get("/new", (req, res) => {
  res.render("comments/new-comment.ejs", {
    campgroundId: req.params.campgroundId
  });
});

// ===================================================================================
// @route   POST    /campgrounds/:campgroundId/comments
// @desc    SAVE NEW COMMENT TO THE DATABASE AND REDIRECT TO THE CAMPGROUND SHOW PAGE
// @access  PRIVATE
// ===================================================================================
router.post("/", (req, res) => {
  const comment = req.body.comment;
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

// ===================================================================================
// @route   GET    /campgrounds/:campgroundId/comments/edit
// @desc    RETRIEVE COMMENT FROM DATABASE AND SHOW EDIT COMMENT PAGE
// @access  PROTECTED
// ===================================================================================
router.get("/:commentId/edit", (req, res) => {
  Comment.findById(req.params.commentId)
    .then(dbComment => {
      res.render("comments/edit-comment.ejs", {
        ejsComment: dbComment,
        campgroundId: req.params.campgroundId
      });
    })
    .catch(err => console.log("Comment Not found"));
});

// ===================================================================================
// @route   PUT    /campgrounds/:campgroundId/comments/:commentId
// @desc    UPDATE COMMENT IN THE DATABASE AND REDIRECT TO THE CAMPGROUND SHOW PAGE
// @access  PRIVATE
// ===================================================================================
router.put("/:commentId", (req, res) => {
  Comment.findByIdAndUpdate(req.params.commentId, {
    text: req.body.comment.text
  })
    .then(() => {
      res.redirect("/campgrounds/" + req.params.campgroundId);
    })
    .catch(err => console.log("Can not update comment"));
});

// ===================================================================================
// @route   DELETE    /campgrounds/:campgroundId/comments/:commentId
// @desc    DELETE COMMENT FROM DATABASE AND REDIRECT TO THE CAMPGROUND SHOW PAGE
// @access  PRIVATE
// ===================================================================================
router.delete("/:commentId", (req, res) => {
  Campground.findById(req.params.campgroundId)
    .then(dbCampground => {
      Comment.findByIdAndRemove(req.params.commentId).then(() => {
        dbCampground.comments.pull(req.params.commentId);
        dbCampground
          .save()
          .then(() => {
            res.redirect("/campgrounds/" + req.params.campgroundId);
          })
          .catch(err => console.log("Can not add comments"));
      });
    })
    .catch(err => console.log("Can not find campground"));
});

module.exports = router;
