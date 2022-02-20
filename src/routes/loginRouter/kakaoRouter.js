const { Router } = require("express");
require("dotenv").config();

const router = Router();
const clientID = process.env.CLIENT_ID;
const redirectUri = process.env.LOGIN_REDIRECT_URI;

router.get("/", (req, res) => {
  const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectUri}&response_type=code&scope=profile_nickname,profile_nickname, account_email`;
  res.redirect(kakaoAuthURL);
});

router.get("/logout", (req, res) => {
  delete req.session.kakao; // 세션 목록에서 kakao 제거
  req.session.save(() => {
    // 제거 성공시 루트 페이지로 이동
    res.redirect("/");
  });
});

module.exports = router;
