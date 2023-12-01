const { Post } = require('../models');

const postData = [
  {
    'title': 'The Future of Technology',
    'description': 'Exploring the latest advancements in technology and predicting future trends.',
    'user_id': 2, 
    
  },
  {
    'title': 'Web Development Best Practices',
    'description': 'Tips and tricks for writing clean and efficient code in web development.',
    'user_id': 2, 
    
  },
  {
    'title': 'The Rise of Artificial Intelligence',
    'description': 'Exploring the impact of AI on various industries and its implications for the future.',
    'user_id': 2, 
    
  }
];

// Seed the posts into the database
const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
