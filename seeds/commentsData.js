const { Comment } = require('../models');

const commentsData = [
  {
    comment: 'This is a great post!',
    commenter_id: 1, 
    blog_id: 1, 
    date_created: new Date()
  },
  {
    comment: 'I have a different perspective on this topic.',
    commenter_id: 2, // 
    blog_id: 1, 
    date_created: new Date()
  }
];

// Seed the comments into the database
const seedComments = () => Comment.bulkCreate(commentsData);

module.exports = seedComments;
