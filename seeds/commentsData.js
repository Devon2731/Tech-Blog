const { Comments } = require('../models');

const commentsData = [
  {
    'comment': 'This is a great post!',
    'commenter_id': 1, 
    'post_id': 1, 
  },
  {
    'comment': 'I have a different perspective on this topic.',
    'commenter_id': 2, 
    'blog_id': 1, 
  }
];

// Seed the comments into the database
const seedComments = () => Comments.bulkCreate(commentsData);

module.exports = seedComments;
