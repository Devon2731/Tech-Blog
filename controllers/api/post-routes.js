const router = require('express').Router();
const { Post, Comments } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to get all posts
router.get('/posts', async (_req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve posts' });
  }
});

// Route to get a specific post by ID
router.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve the post' });
  }
});

// Route to create a new post (requires authentication)
router.post('/posts', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id, // Assuming you store user_id in the session
    });
    res.json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create the post' });
  }
});

// Route to update a post (requires authentication)
router.put('/posts/:id', withAuth, async (req, res) => {
  try {
    const updatedPost = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );
    if (updatedPost[0] === 0) {
      res.status(403).json({ error: 'You do not have permission to update this post' });
      return;
    }
    res.json({ message: 'Post updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update the post' });
  }
});

// Route to delete a post (requires authentication)
router.delete('/posts/:id', withAuth, async (req, res) => {
  try {
    const deletedPost = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (deletedPost === 0) {
      res.status(403).json({ error: 'You do not have permission to delete this post' });
      return;
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete the post' });
  }
});

// Route to create a new comment (requires authentication)  
router.post('/comments', withAuth, async (req, res) => {
    try {
        if (req.body.description) {
            const commentInput = {
                comment : req.body.description,
                user_id: req.session.user_id,
                post_id: req.body.post_id
            }
            const commentData = await Comments.create(commentInput);
            res.status(200).json(commentData);
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create the comment' });
    }
})

module.exports = router;


