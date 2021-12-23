const { Router } = require('express');

const router = Router();

const {
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
  returnImgUrl,
  upload,
  clearImages,
} = require('./apiController');

const { isLoggedIn, setLoggedInStatus } = require('../../middlewares');

router.get('/get-user', setLoggedInStatus, getUserLoggedIn);

router.get('/user-detail', isLoggedIn, getUserDetail);

router.put('/users/:id', isLoggedIn, updateUser);
router.delete('/users/:id', isLoggedIn, deleteUser);
router.post('/imgFirst', upload.single('img'), returnImgUrl); // 이미지 업로드
router.post('/clear-images', clearImages);

router.post('/posts', isLoggedIn, createPost);
// id => post.id
router.get('/posts/:id', getPost);
router.delete('/posts/:id', isLoggedIn, deletePost);
router.put('/posts/:id', isLoggedIn, updatePost);

router.post('/:id/comments', isLoggedIn, createComment); // 댓글 생성

// id => comment.id
router.delete('/comments/:id', isLoggedIn, deleteComment); // 댓글 삭제
router.put('/comments/:id', isLoggedIn, updateComment); // 댓글 수정
router.post('/:id/recomments', isLoggedIn, createReComment); // 대댓글 생성

// id => recomment.id
router.delete('/recomments/:id', isLoggedIn, deleteReComment); // 대댓글 삭제
router.put('/recomments/:id', isLoggedIn, updateReComment); // 대댓글 수정

router.get('/lost-pets', getLostPets);

module.exports = router;
