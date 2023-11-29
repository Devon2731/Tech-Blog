const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Post, User, Comment } = require('../models');
const format_date = require('../utils/helper');

// Route to get all posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.findAll();
    const formattedPosts = posts.map(post => ({
      ...post.get(),
      formattedCreatedAt: format_date(post.createdAt),
    }));
    res.json(formattedPosts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve posts' });
  }
});

// Route to get a specific post by ID
router.get('/posts/:id', withAuth, async (req, res) => {
  try {
    console.log("Retrieve comments for post ");
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username']
        },
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
    });
    const formattedPost = {
      ...postData.get(),
      formattedCreatedAt: format_date(postData.createdAt), 
    };
    res.json(formattedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve post comments' });
  }
});

// Route to create a new post (requires authentication)
router.post('/posts', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id, 
    });
    res.json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create the post' });
  }
});

// Route to get user-specific posts (dashboard) - requires authentication
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      include: {
        model: User,
        attributes: ['username']
      }
    });
    const posts = postData.map(post => post.get({ plain: true }));
    res.render('dashboard', { posts, logged_in: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve dashboard posts' });
  }
});

// Route to render the login page
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.user_id) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

// Route to render the signup page
router.get('/signup', (req, res) => {
  res.render('signup');
});

// Route to log out (destroy session) and redirect to login page
router.get('/logout', (req, res) => {
  // Ensure the request is made by an authenticated user
  if (!req.session.user_id) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  // Perform logout actions (destroy session) and redirect
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to log out' });
      return;
    }
    res.redirect('/login'); // Redirect to the login page or another desired route
  });
});

module.exports = router;
