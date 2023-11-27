const router = require('express').Router();
const { User } = require('../../models');

// Route to create a new user
router.post('/users', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password, // Remember to hash passwords before storing in a production environment
    });
    res.json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create the user' });
  }
});

// Route to log in (check credentials)
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user || !user.checkPassword(req.body.password)) {
      res.status(401).json({ error: 'Incorrect username or password' });
      return;
    }

    // Set up session for the logged-in user
    req.session.user_id = user.id;

    res.json({ message: 'Login successful', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to log in' });
  }
});

// Route to get user data (requires authentication)
router.get('/users/:id', (req, res) => {
  // Ensure the request is made by an authenticated user
  if (!req.session.user_id) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  // Fetch user data based on the user_id stored in the session
  User.findByPk(req.session.user_id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve user data' });
    });
});

// Route to log out (destroy session)
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to log out' });
      return;
    }
    res.json({ message: 'Logout successful' });
  });
});

module.exports = router;
