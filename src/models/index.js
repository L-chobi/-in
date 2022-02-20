const mongoose = require('mongoose');

const PostSchema = require('./schemas/post');
const UserSchema = require('./schemas/user');
const CommentSchema = require('./schemas/comment');
const ReCommentSchema = require('./schemas/re-comment');

exports.Post = mongoose.model('Post', PostSchema);
exports.User = mongoose.model('User', UserSchema);
exports.Comment = mongoose.model('Comment', CommentSchema);
exports.ReComment = mongoose.model('ReComment', ReCommentSchema);
