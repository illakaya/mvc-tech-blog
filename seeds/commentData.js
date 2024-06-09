const { Comment } = require('../models');

const commentData = [
  {
    text: 'I just learnt about this in my class!',
    user_id: 2,
    post_id: 1,
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;