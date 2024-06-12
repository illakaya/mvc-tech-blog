const { Post } = require('../models');

const postData = [
  {
    title: 'Why MVC is so important',
    text: 'MVC allows developers to maintain a true separation of concerns, devising their code between the Model layer for data, the View layger for design, and the Controller layer for application logic',
    user_id: 1,
  },
  {
    title: 'Authentication vs. Authorisation',
    text: 'There is a difference between authentication and authorisation. Authentication means confirming your own identity, whereas authorisation means being allowed access to the system.',
    user_id: 1,
  },
  {
    title: 'Object-Relational Mapping',
    text: "I have really loved learning about ORMs. It's really simplified the way I create queries!",
    user_id: 2,
  }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;