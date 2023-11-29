const User = require('./user');
const Post = require('./post');
const Comment = require('./comments'); 

// Define associations
User.hasMany(Post, { foreignKey: 'user_id' });
Post.belongsTo(User, { foreignKey: 'user_id' });

Post.hasMany(Comment, { foreignKey: 'post_id' });
Comment.belongsTo(Post, { foreignKey: 'post_id' });

Comment.belongsTo(User, { foreignKey: 'commenter_id' });
User.hasMany(Comment, { foreignKey: 'commenter_id' });


module.exports = { User, Post, Comment };
