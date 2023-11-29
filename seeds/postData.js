const { Post } = require('../models');

const postData = [
  {
    title: 'The Future of Technology',
    content: 'Exploring the latest advancements in technology and predicting future trends.',
    user_id: 1, 
    date_created: new Date()
  },
  {
    title: 'Web Development Best Practices',
    content: 'Tips and tricks for writing clean and efficient code in web development.',
    user_id: 2, 
    date_created: new Date()
  },
  {
    title: 'The Rise of Artificial Intelligence',
    content: 'Exploring the impact of AI on various industries and its implications for the future.',
    user_id: 3, 
    date_created: new Date()
  }
];

// Seed the posts into the database
const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
