const { Router } = require("express");
const axios = require("axios");
const qs = require("qs");
const { User } = require("../../models");

const router = Router();

require("dotenv").config();

router.get("/", async (req, res) => {
  let token;
  const kakao = {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.LOGIN_REDIRECT_URI,
  };

  try {
    token = await axios({
      method: "POST",
      url: "https://kauth.kakao.com/oauth/token",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        grant_type: "authorization_code",
        client_id: kakao.clientID,
        client_secret: kakao.clientSecret,
        redirectUri: kakao.redirectUri,
        code: req.query.code,
      }),
    });
  } catch (err) {
    res.json(err.data);
  }

  let user;

  try {
    user = await axios({
      method: "get",
      url: "https://kapi.kakao.com/v2/user/me",
      headers: {
        Authorization: `Bearer ${token.data.access_token}`,
      },
    });
  } catch (e) {
    res.json(e.data);
  }

  req.session.kakao = user.data;

  const newUser = await User.findOne({
    email: req.session.kakao.kakao_account.email,
  });

  if (!newUser) {
    try {
      await User.create({
        //kakaoId: req.session.kakao.id,
        email: req.session.kakao.kakao_account.email,
        nickname: req.session.kakao.kakao_account.profile.nickname,
      });
    } catch (err) {
      console.log(err);
    }
  }

  res.redirect("/");
});

module.exports = router;
