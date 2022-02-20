const { Schema } = require('mongoose');

const commentSchema = require('./comment');

const postSchema = require('./post');
const reCommentSchema = require('./re-comment');

const UserSchema = new Schema(
  {
    // kakaoId: {
    //   type: String,
    //   required: true,
    // },
    email: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    posts: [postSchema],
    comments: [commentSchema],
    reComments: [reCommentSchema],
  },
  {
    timestamps: true,
  },
);

module.exports = UserSchema;
