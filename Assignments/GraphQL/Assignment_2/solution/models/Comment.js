const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
