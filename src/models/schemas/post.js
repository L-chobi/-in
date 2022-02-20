const { Schema } = require("mongoose");

const CommentSchema = require("./comment");

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    thumbnail: {
      type: String,
    },
    category: {
      type: String,
      default: "반려 이야기",
    },
    likes: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    comments: [CommentSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = PostSchema;
