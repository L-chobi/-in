const { User } = require('../../models');

const logined = async (req, res) => {
  try {
    if (!req.isLoggedIn) {
      res.redirect('/login');
      return;
    }

    const {
      kakao_account: { email },
    } = req.session.kakao;

    const user = await User.findOne({ email });

    res.render('myPage.html', user);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { logined };
