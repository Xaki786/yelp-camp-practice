const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commentSchema = new Schema({
  text: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    name: String
  }
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
