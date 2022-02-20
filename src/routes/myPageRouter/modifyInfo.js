const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  if (!req.session.kakao) {
    //카카오 로그인을 안해서 세션에 없으면 로그인을 하도록 루트 페이지로 이동시킴. 원래는 마이페이지를 통해서만 이동하므로 해당 페이지로 바로 오는건 구조상 안됨
    //혹시 모르므로 해당 페이지에서도 막아놓으려 해당 조건을 설정함.
    res.send(
      "<script>alert('로그인이 필요한 기능입니다.');location.href='/';</script>"
    );
    return;
  } else {
    //카카오 로그인을 해서 세션에 kakao가 존재하면
    res.render("modifyMyInfo.html"); //
    return;
  }
});

module.exports = router;
