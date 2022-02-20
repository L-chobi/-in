const { Schema } = require('mongoose');
const reCommentSchema = require('./re-comment');

const CommentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    parentPost: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    reComments: [reCommentSchema],
  },
  {
    timestamps: true,
  },
);

module.exports = CommentSchema;
