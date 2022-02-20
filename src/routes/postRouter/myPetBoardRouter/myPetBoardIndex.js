const { Router } = require("express");
const router = Router();

const {
  getPosts,
  getPostDetail,
  createPost,
  deletePost,
  updatePost,
} = require("./myPetBoardController");

router.get("/", getPosts); // 게시물 전체 라우터
router.get("/:id", getPostDetail); // 상세 페이지 라우터
router.post("/", createPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);

module.exports = router;
