const User = require('./user');
const Post = require('./post');
const Comments = require('./comments'); 

// Define associations
User.hasMany(Post, { foreignKey: 'user_id' });
Post.belongsTo(User, { foreignKey: 'user_id' });

Post.hasMany(Comments, { foreignKey: 'post_id' });
Comments.belongsTo(Post, { foreignKey: 'post_id' });

Comments.belongsTo(User, { foreignKey: 'commenter_id' });
User.hasMany(Comments, { foreignKey: 'commenter_id' });


module.exports = { User, Post, Comments };
