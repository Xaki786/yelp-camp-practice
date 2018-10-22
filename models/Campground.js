const mongoose = require("mongoose");
const Comment = require("./Comment.js");
const User = require("./User.js");
const campgroundSchema = new mongoose.Schema({
  name: String,
  url: String,
  desc: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  date: {
    type: Date,
    default: new Date().now
  }
});
const Campground = mongoose.model("campgrounds", campgroundSchema);
module.exports = Campground;
