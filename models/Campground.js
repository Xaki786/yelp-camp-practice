const mongoose = require("mongoose");
const campgroundSchema = new mongoose.Schema({
  name: String,
  url: String,
  desc: String
});
const Campground = mongoose.model("campgrounds", campgroundSchema);
module.exports = Campground;
