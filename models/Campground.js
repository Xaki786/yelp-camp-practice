const mongoose = require("mongoose");
const Comment = require("./Comment.js");
const campgroundSchema = new mongoose.Schema({
  name: String,
  url: String,
  desc: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});
const Campground = mongoose.model("campgrounds", campgroundSchema);
module.exports = Campground;
