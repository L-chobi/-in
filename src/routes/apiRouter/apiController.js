const axios = require("axios");

const mockData = require("./mockData");

const { User, Post, Comment, ReComment } = require("../../models");

const { s3 } = require("../../middlewares");

const getUserLoggedIn = async (req, res) => {
  try {
    const { isLoggedIn, session } = req;

    if (!isLoggedIn) return res.status(200).json({}).end();

    const { email } = session.kakao.kakao_account;

    const user = await User.findOne({ email });

    res.json(user).end();
  } catch (error) {
    res.status(500);
  }
};

const getDistrict = async (req, res) => {
  try {
    const {
      query: { upr_cd: uprCd },
    } = req;

    const { SERVICE_KEY } = process.env;

    const HOST =
      "http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc";

    const URL = `${HOST}/sigungu?serviceKey=${SERVICE_KEY}&upr_cd=${uprCd}`;

    const {
      data: {
        response: {
          body: {
            items: { item: sigungu },
          },
        },
      },
    } = await axios.get(URL);

    res.json(sigungu);
  } catch (error) {
    res.status(500).end();
  }
};

const getLostPets = async (req, res) => {
  try {
    const {
      query: {
        pageNo,
        numOfRows,
        upkind,
        upr_cd: uprCd,
        org_cd: orgCd,
        state,
        bgnde,
        endde,
      },
    } = req;

    // 공공 API 요청 코드

    const { SERVICE_KEY } = process.env;

    const HOST =
      "http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc";

    const URL = `${HOST}/abandonmentPublic?pageNo=${pageNo}&numOfRows=${numOfRows}&upkind=${upkind}&upr_cd=${uprCd}&org_cd=${orgCd}&state=${state}&bgnde=${bgnde}&endde=${endde}&ServiceKey=${SERVICE_KEY}`;

    const {
      data: {
        response: { body: lostPets },
      },
    } = await axios.get(URL);

    res.json(lostPets);

    // mock data 요청 코드

    // const { data } = mockData;

    // const parsedItem = [...data.items.item].slice((pageNo - 1) * numOfRows, numOfRows * pageNo);

    // const lostPets = {
    //   items: {
    //     item: parsedItem,
    //   },
    //   numOfRows,
    //   pageNo,
    //   totalCount: 220,
    // };

    // if (upkind === '422400') lostPets.totalCount = 10;
    // if (upkind === '429900') lostPets.totalCount = 30;
    // if (upkind === '417000') lostPets.totalCount = 180;

    // res.json(lostPets);
  } catch (error) {
    res.status(500);
  }
};

const getUserDetail = async (req, res) => {
  const { session } = req;

  try {
    const { email } = session.kakao.kakao_account;

    const user = await User.findOne({ email });

    if (!user) res.status(404).end();

    res.status(200).json(user);
  } catch (error) {
    res.status(500);
  }
};

const updateUser = async (req, res) => {
  const {
    params: { id },
    body: { nickname },
  } = req;
  try {
    // const { email } = session.kakao.kakao_account;
    // const email = '1kimdg1@gmail.com';

    await User.updateOne(
      { _id: id },
      {
        nickname,
      }
    );

    const user = await User.findOne({ _id: id });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteUser = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    await User.deleteOne({ _id: id });

    delete req.session.kakao;

    req.session.save();

    res.redirect(204, "/");
  } catch (error) {
    res.status(500);
  }
};

const getPost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findOne({ _id: id })
      .populate("author", "email nickname")
      .populate({
        path: "comments",
        populate: {
          path: "author",
          select: "nickname",
        },
      })
      .populate({
        path: "comments.reComments",
        populate: {
          path: "author",
          select: "nickname",
        },
      });

    res.status(200).json(post).end();
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).end();
    }
    res.status(500).end();
  }
};

const returnImageUrls = (req, res) => {
  const {
    file: { location },
  } = req;
  try {
    res.json({ url: location });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

const clearImages = async (req, res) => {
  const {
    body: { deleteFileNames },
  } = req;

  try {
    if (!deleteFileNames) return res.status(204).end();

    await deleteFileNames.forEach((fileName) => {
      s3.deleteObject(
        {
          Bucket: "wetube22", // 사용자 버켓 이름
          Key: `ch/${fileName}`, // 버켓 내 경로
        },
        (err, data) => {
          if (err) throw err;
          console.log("s3 deleteObject ", fileName);
        }
      );
    });
    res.status(200).end();
  } catch (error) {
    res.status(500).end();
  }
};

const createPost = async (req, res) => {
  const {
    body: { title, content, thumbnail },
    session,
  } = req;

  try {
    const { email } = session.kakao.kakao_account;

    const user = await User.findOne({ email });

    if (!title || !content) return res.status(400).end();

    // 포스트 생성
    const post = await Post.create({
      title,
      content,
      author: user.id,
      thumbnail,
    });

    // 유저 posts에 포스트 추가
    user.posts.push(post);
    user.save();

    res.status(201).end();
  } catch (error) {
    res.status(500).send(error);
  }
};

const deletePost = async (req, res) => {
  const {
    params: { id },
    session,
  } = req;

  try {
    const { email } = session.kakao.kakao_account;

    const user = await User.findOne({ email });

    const post = await Post.findOne({ _id: id }).populate("author");

    const { author } = post;

    if (user.id !== author.id) return res.status(401).end();

    await Post.deleteOne({ _id: id });

    // 댓글에서 포스트와 관련된 댓글 모두 삭제
    await Comment.deleteMany({ parentPost: id });

    // 대댓글에서 포스트와 관련된 대댓글 모두 삭제
    await ReComment.deleteMany({ parentPost: id });

    // 유저에서 포스트 삭제
    const newUserPosts = user.posts.filter((item) => item.id !== id);

    user.posts = newUserPosts;

    // 유저 댓글에서 포스트와 연관된 댓글 모두 삭제
    const newUserComments = user.comments.filter(
      (item) => item.parentPost.toString() !== id
    );

    user.comments = newUserComments;

    // 유저 대댓글에서 포스트와 연관된 대댓글 모두 삭제
    const newUserReComments = user.reComments.filter(
      (item) => item.parentPost.toString() !== id
    );

    user.reComments = newUserReComments;

    user.save();

    res.status(204);
    res.redirect("/myPetBoard");
    res.end();
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).end();
    }
    res.status(500).end();
  }
};

const updatePost = async (req, res) => {
  const {
    params: { id },
    body: { title, content, thumbnail },
    session,
  } = req;

  try {
    if (!title || !content) {
      res.status(400).end();
    }

    const { email } = session.kakao.kakao_account;

    const user = await User.findOne({ email });

    const post = await Post.findOne({ _id: id }).populate("author");

    const { author } = post;

    if (user.id !== author.id) return res.status(401).end();

    await Post.updateOne(
      { _id: id },
      {
        title,
        content,
        thumbnail: thumbnail || "",
      }
    );

    const updatedUserPost = user.posts.find((item) => item.id === id);

    updatedUserPost.title = title;
    updatedUserPost.content = content;

    user.save();

    res.status(200).end();
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).end();
    }
    res.status(500).end();
  }
};

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

    if (!user) {
      return res.status(404).end();
    }

    const post = await Post.findOne({ _id: id });

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

    res.status(201);
    res.json(newComment);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).end();
    }
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

    // 댓글 삭제
    const comment = await Comment.findOne({ _id: id })
      .populate("author")
      .populate("parentPost");

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
    if (error.kind === "ObjectId") {
      return res.status(400).end();
    }
    res.status(500).end();
  }
};

const updateComment = async (req, res) => {
  const {
    params: { id },
    body: { content },
    session,
  } = req;

  try {
    if (!content) {
      return res.status(400).end();
    }

    const { email } = session.kakao.kakao_account;
    // 유저 찾기
    const user = await User.findOne({ email });

    // 댓글 수정
    const comment = await Comment.findOne({ _id: id })
      .populate("author")
      .populate("parentPost");

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

    res.status(200).end();
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).end();
    }
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

    if (!user) {
      return res.status(404).end();
    }

    const comment = await Comment.findOne({ _id: id }).populate("parentPost");

    // 대댓글 생성
    const newReComment = await ReComment.create({
      content,
      author: user.id,
      parentComment: comment.id,
      parentPost: comment.parentPost.id,
    });

    // 댓글에 대댓글 추가
    comment.reComments.push(newReComment);
    comment.save();

    const { parentPost } = comment;

    // 포스트에 대댓글 추가
    const post = await Post.findOne({ _id: parentPost.id }).populate(
      "comments"
    );

    const updatedPostComment = post.comments.find(
      (item) => item.id === comment.id
    );

    updatedPostComment.reComments.push(newReComment);
    post.save();

    // 유저에 대댓글 추가
    user.reComments.push(newReComment);
    user.save();

    res.status(201);
    res.json(newReComment);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).end();
    }
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

    // 대댓글 삭제
    const reComment = await ReComment.findOne({ _id: id })
      .populate("author")
      .populate("parentComment");

    const { author, parentComment } = reComment;

    if (user.id !== author.id) return res.status(401).end();

    await ReComment.deleteOne({ _id: id });

    // 댓글에 포함된 대댓글 삭제
    const comment = await Comment.findOne({ _id: parentComment.id }).populate(
      "parentPost"
    );

    if (!comment) {
      return res.status(400).end();
    }

    const newReComments = comment.reComments.filter((item) => item.id !== id);

    comment.reComments = newReComments;
    comment.save();

    const { parentPost } = comment;

    // 포스트에서 대댓글 삭제
    const post = await Post.findOne({ _id: parentPost.id });

    const updatedComment = post.comments.find((item) => item.id === comment.id);

    updatedComment.reComments = newReComments;
    post.save();

    // 유저에 포함된 대댓글 삭제
    const newUserReComments = user.reComments.filter((item) => item.id !== id);

    user.reComments = newUserReComments;
    user.save();

    res.status(204).end();
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).end();
    }
    res.status(500).end();
  }
};

const updateReComment = async (req, res) => {
  const {
    params: { id },
    body: { content },
    session,
  } = req;

  try {
    if (!content) {
      return res.status(400).end();
    }

    const { email } = session.kakao.kakao_account;

    const user = await User.findOne({ email });

    // 대댓글 수정
    const reComment = await ReComment.findOne({ _id: id })
      .populate("author")
      .populate("parentComment");

    const { author, parentComment } = reComment;

    if (user.id !== author.id) return res.status(401).end();

    await ReComment.updateOne({ _id: id }, { content });

    // 댓글에 포함된 대댓글 수정
    const comment = await Comment.findOne({ _id: parentComment.id }).populate(
      "parentPost"
    );

    const updatedReComment = comment.reComments.find((item) => item.id === id);

    updatedReComment.content = content;

    comment.save();

    const { parentPost } = comment;

    // 포스트에 포함된 대댓글 수정
    const post = await Post.findOne({ _id: parentPost.id });

    const updatedComment = post.comments.find((item) => item.id === comment.id);

    const updatedPostReComment = updatedComment.reComments.find(
      (item) => item.id === id
    );

    updatedPostReComment.content = content;

    post.save();

    // 유저에 포함된 대댓글 수정
    const updatedUserReComment = user.reComments.find((item) => item.id === id);

    updatedUserReComment.content = content;

    user.save();

    res.status(200).end();
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).end();
    }
    res.status(500).end();
  }
};

const myPetBoardPreview = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ createdAt: "desc" });
    const previewAry = [];

    for (let i = 0; i < 6; i++) {
      previewAry.push(posts[i]);
    }

    res.json({ data: previewAry });
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
  getPost,
  createPost,
  deletePost,
  updatePost,
  getUserDetail,
  updateUser,
  deleteUser,
  getLostPets,
  getUserLoggedIn,
  returnImageUrls,
  clearImages,
  getDistrict,
  myPetBoardPreview,
};
