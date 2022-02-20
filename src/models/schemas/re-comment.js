const { Schema } = require('mongoose');

const reCommentSchema = new Schema(
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
    parentComment: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = reCommentSchema;
