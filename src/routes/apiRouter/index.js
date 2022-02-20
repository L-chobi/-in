const { Router } = require("express");

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
  returnImageUrls,
  clearImages,
  getDistrict,
  myPetBoardPreview,
} = require("./apiController");

const {
  isLoggedIn,
  setLoggedInStatus,
  uploadImagesS3,
} = require("../../middlewares");

router.get("/get-user", setLoggedInStatus, getUserLoggedIn);

router.get("/user-detail", isLoggedIn, getUserDetail);

router.put("/users/:id", isLoggedIn, updateUser);
router.delete("/users/:id", isLoggedIn, deleteUser);

router.post("/return-imageUrl", uploadImagesS3, returnImageUrls); // 이미지 저장 - URL 반환
router.post("/clear-images", clearImages); // 이미지 삭제

router.post("/posts", isLoggedIn, createPost);
// id => post.id
router.get("/posts/:id", getPost);
router.get("/posts/delete/:id", isLoggedIn, deletePost); // s3 삭제 추가해야 함
router.put("/posts/:id", isLoggedIn, updatePost);

router.post("/:id/comments", isLoggedIn, createComment); // 댓글 생성

// id => comment.id
router.delete("/comments/:id", isLoggedIn, deleteComment); // 댓글 삭제
router.put("/comments/:id", isLoggedIn, updateComment); // 댓글 수정
router.post("/:id/recomments", isLoggedIn, createReComment); // 대댓글 생성

// id => recomment.id
router.delete("/recomments/:id", isLoggedIn, deleteReComment); // 대댓글 삭제
router.put("/recomments/:id", isLoggedIn, updateReComment); // 대댓글 수정

router.get("/lost-pets", getLostPets);
router.get("/get-district", getDistrict);
router.get("/getMyPetBoardPreview", myPetBoardPreview);
module.exports = router;
