const { Post, User } = require('../../../models');

// 근황 게시판 페이지
const getPosts = async (req, res) => {
  try {
    const { query } = req;

    const page = Number(query.page || 1); // url 쿼리에서 page 받기, 기본값 1
    const perPage = Number(query.perPage || 15); // url 쿼리에서 peRage 받기, 기본값 15
    const title = query.title || '';
    const content = query.content || '';
    const author = query.author || '';

    const titleSearch = {
      title: {
        $regex: query.title || /^(?![\s\S])/,
        $options: 'i',
      },
    };

    const contentSearch = {
      content: {
        $regex: query.content || /^(?![\s\S])/,
        $options: 'i',
      },
    };

    const searchConditions = {
      $or: [titleSearch, contentSearch],
    };

    if (!query.title && !query.content) searchConditions.$or = [{}];

    const total = await Post.countDocuments(searchConditions);

    const posts = await Post.find(searchConditions)
      .lean()
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .populate({
        path: 'author',
        select: 'nickname',
      });

    const totalPage = Math.ceil(total / perPage);

    const authors = {
      posts: null,
      pages: 0,
    };

    if (query.author) {
      const allPosts = await Post.find({})
        .lean()
        .sort({ createdAt: -1 })
        .populate({
          path: 'author',
          select: 'nickname',
        });

      const authorRegex = new RegExp(`${query.author}`, 'gi');
      const authorsPosts = allPosts.filter((post) => post.author?.nickname.match(authorRegex));
      authors.posts = authorsPosts.slice((page - 1) * perPage, page * perPage);
      authors.pages = authorsPosts.length
        ? Math.ceil(authorsPosts.length / perPage)
        : 1;
    }

    res.render('myPetBoard.html', {
      isLogined: req.isLoggedIn,
      posts: query.author ? authors.posts : posts,
      page,
      perPage,
      totalPage: authors.pages || totalPage,
      title,
      content,
      author,
    });
  } catch (error) {
    console.log(error);
    res.status(500).redirect('/myPetBoard');
  }
};

// 게시물(상세) 페이지
const getPostDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findOne({ _id: id }).populate({
      path: 'author',
      select: 'nickname',
    });

    if (!post) res.status(404).end();

    post.views += 1;

    post.save();

    res.render('myPetBoardDetail.html', {
      isLogined: req.isLoggedIn,
      data: post,
    });
  } catch (error) {
    res.status(500).redirect('/');
  }
};

const getWritePage = (req, res) => {
  try {
    res.render('editorPage.html');
  } catch (error) {
    console.log(error);
    res.status(500).redirect('/');
  }
};

const getUpdatePage = async (req, res) => {
  try {
    const {
      params: { id },
      session,
    } = req;

    const { email } = session.kakao.kakao_account;

    const user = await User.findOne({ email });

    const post = await Post.findOne({ _id: id }).populate('author');

    const { author } = post;

    if (user.id !== author.id) return res.status(401).end();

    res.render('editorUpdatePage.html');
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).end();
    }
    res.status(500).redirect('/');
  }
};

module.exports = {
  getPosts,
  getPostDetail,
  getWritePage,
  getUpdatePage,
};
