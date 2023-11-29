const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Post, User, Comment } = require('../models');
const format_date = require('../utils/helper');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: {
        model: User,
        attributes: ['username']
      }
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('home', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/post', async (req, res) => {
  res.render('postform');
});

router.get('/post/:id', async (req, res) => {
  try {
    console.log('Retrieving post comments');
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['id', 'username'],
          include: [
            {
              model: Comment,
              attributes: ['comment', 'commenter_id', 'date_created'],
              include: [
                {
                  model: User,
                  attributes: ['id', 'username']
                }
              ]
            }
          ]
        }
      ]
    });
    const post = postData.get({ plain: true });

    if (post.author_id == req.session.user_id) {
      res.render('postit', {
        post,
        logged_in: req.session.logged_in,
      });
    } else {
      res.render('postview', {
        post,
        logged_in: req.session.logged_in,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('dashboard', {
      posts,
      logged_in: req.session.logged_in,
      isDashboard: true
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

module.exports = router;
