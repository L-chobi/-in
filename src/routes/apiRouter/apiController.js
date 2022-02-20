const {
  User,
  Post,
  Comment,
  ReComment,
} = require('../../models');

const createComment = async (req, res) => {
  const {
    params: { id },
    body: { content },
    session,
  } = req;

  try {
    const { email } = session.kakao.kakao_account;

    // 유저 찾기
    const user = await User.findOne({ email });
    // const user = await User.findOne({ nickname: 'TEST' });

    if (!user) {
      return res.status(404).end();
    }

    const post = await Post.findOne({ _id: id });

    if (!post) {
      return res.status(400).end();
    }

    // 댓글 생성
    const newComment = await Comment.create({
      content,
      author: user.id,
      parentPost: post.id,
    });
    // 포스트에 댓글 추가
    post.comments.push(newComment);
    post.save();
    // 유저에 댓글 추가
    user.comments.push(newComment);
    user.save();

    res.status(201).end();
  } catch (error) {
    res.status(500).end();
  }
};

const deleteComment = async (req, res) => {
  const {
    params: { id },
    session,
  } = req;

  try {
    const { email } = session.kakao.kakao_account;
    // 유저 찾기
    const user = await User.findOne({ email });
    // const user = await User.findOne({ nickname: 'TEST' });

    // 댓글 삭제
    const comment = await Comment.findOne({ _id: id })
      .populate('author')
      .populate('parentPost');

    if (!comment) {
      return res.status(400).end();
    }

    const { author, parentPost } = comment;

    if (user.id !== author.id) return res.status(401).end();

    await Comment.deleteOne({ _id: id });
    // 포스트에 포함된 댓글 삭제
    const post = await Post.findOne({ _id: parentPost.id });

    const newPostComments = post.comments.filter((item) => item.id !== id);

    post.comments = newPostComments;
    post.save();

    // 유저에 포함된 댓글 삭제
    const newUserComments = user.comments.filter((item) => item.id !== id);

    user.comments = newUserComments;
    user.save();

    res.status(204).end();
  } catch (error) {
    res.status(500).end();
  }
};

const updateComment = async (req, res) => {
  const {
    params: { id },
    body: {
      content,
    },
    session,
  } = req;

  try {
    if (!content) {
      return res.status(400).end();
    }

    const { email } = session.kakao.kakao_account;
    // 유저 찾기
    const user = await User.findOne({ email });
    // const user = await User.findOne({ nickname: 'TEST' });

    // 댓글 수정
    const comment = await Comment.findOne({ _id: id })
      .populate('author')
      .populate('parentPost');

    if (!comment) {
      return res.status(400).end();
    }

    const { author, parentPost } = comment;

    if (user.id !== author.id) return res.status(401).end();

    await Comment.updateOne({ _id: id }, { content });

    // 포스트에 포함된 댓글 수정
    const post = await Post.findOne({ _id: parentPost.id });

    const updatedPostComment = post.comments.find((item) => item.id === id);

    updatedPostComment.content = content;

    post.save();

    // 유저에 포함된 댓글 수정
    const updatedUserComment = user.comments.find((item) => item.id === id);

    updatedUserComment.content = content;

    user.save();

    res.status(201).end();
  } catch (error) {
    res.status(500).end();
  }
};

const createReComment = async (req, res) => {
  const {
    params: { id },
    body: { content },
    session,
  } = req;

  try {
    const { email } = session.kakao.kakao_account;

    const user = await User.findOne({ email });
    // const user = await User.findOne({ nickname: 'TEST' });

    if (!user) {
      return res.status(404).end();
    }

    const comment = await Comment.findOne({ _id: id })
      .populate('parentPost');

    if (!comment) {
      return res.status(400).end();
    }

    // 대댓글 생성
    const newReComment = await ReComment.create({
      content,
      author: user.id,
      parentComment: comment.id,
    });

    // 댓글에 대댓글 추가
    comment.reComments.push(newReComment);
    comment.save();

    const { parentPost } = comment;

    // 포스트에 대댓글 추가
    const post = await Post.findOne({ _id: parentPost.id }).populate('comments');

    const updatedPostComment = post.comments
      .find((item) => item.id === comment.id);

    updatedPostComment.reComments.push(newReComment);
    post.save();

    // 유저에 대댓글 추가
    user.reComments.push(newReComment);
    user.save();

    res.status(201).end();
  } catch (error) {
    res.status(500).end();
  }
};

const deleteReComment = async (req, res) => {
  const {
    params: { id },
    session,
  } = req;

  try {
    const { email } = session.kakao.kakao_account;

    const user = await User.findOne({ email });
    // const user = await User.findOne({ nickname: 'TEST' });

    // 대댓글 삭제
    const reComment = await ReComment.findOne({ _id: id })
      .populate('author')
      .populate('parentComment');

    if (!reComment) {
      return res.status(400).end();
    }

    const { author, parentComment } = reComment;

    if (user.id !== author.id) return res.status(401).end();

    await ReComment.deleteOne({ _id: id });

    // 댓글에 포함된 대댓글 삭제
    const comment = await Comment.findOne({ _id: parentComment.id })
      .populate('parentPost');

    if (!comment) {
      return res.status(400).end();
    }

    const newReComments = comment.reComments.filter((item) => item.id !== id);

    comment.reComments = newReComments;
    comment.save();

    const { parentPost } = comment;

    // 포스트에서 대댓글 삭제
    const post = await Post.findOne({ _id: parentPost.id });

    const updatedComment = post.comments
      .find((item) => item.id === comment.id);

    updatedComment.reComments = newReComments;
    post.save();

    // 유저에 포함된 대댓글 삭제
    const newUserReComments = user.reComments.filter((item) => item.id !== id);

    user.reComments = newUserReComments;
    user.save();

    res.status(204).end();
  } catch (error) {
    res.status(500).end();
  }
};

const updateReComment = async (req, res) => {
  const {
    params: { id },
    body: {
      content,
    },
    session,
  } = req;

  try {
    if (!content) {
      return res.status(400).end();
    }

    const { email } = session.kakao.kakao_account;

    const user = await User.findOne({ email });
    // const user = await User.findOne({ nickname: 'TEST' });

    // 대댓글 수정
    const reComment = await ReComment.findOne({ _id: id })
      .populate('author')
      .populate('parentComment');

    if (!reComment) {
      return res.status(400).end();
    }

    const { author, parentComment } = reComment;

    if (user.id !== author.id) return res.status(401).end();

    await ReComment.updateOne({ _id: id }, { content });

    // 댓글에 포함된 대댓글 수정
    const comment = await Comment.findOne({ _id: parentComment.id })
      .populate('parentPost');

    const updatedReComment = comment.reComments.find((item) => item.id === id);

    updatedReComment.content = content;

    comment.save();

    const { parentPost } = comment;

    // 포스트에 포함된 대댓글 수정
    const post = await Post.findOne({ _id: parentPost.id });

    const updatedComment = post.comments
      .find((item) => item.id === comment.id);

    const updatedPostReComment = updatedComment.reComments
      .find((item) => item.id === id);

    updatedPostReComment.content = content;

    post.save();

    // 유저에 포함된 대댓글 수정
    const updatedUserReComment = user.reComments.find((item) => item.id === id);

    updatedUserReComment.content = content;

    user.save();

    res.status(201).end();
  } catch (error) {
    res.status(500).end();
  }
};

module.exports = {
  createComment,
  deleteComment,
  updateComment,
  createReComment,
  deleteReComment,
  updateReComment,
};
