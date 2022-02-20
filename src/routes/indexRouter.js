const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  if (!req.session.kakao) {
    // 카카오 로그인을 안해서 세션에 없으면
    res.render('index.html');
  } else {
    // 카카오 로그인을 해서 세션에 kakao가 존재하면
    res.render('index.html', { isLogined: 'true' });
  }
});

module.exports = router;
