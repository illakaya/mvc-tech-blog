// initialise express
const router = require('express').Router();
// retrieve Post model
const { Post, User, Comment } = require('../../models');

// create a new post
router.post('/', async (req, res) => {
  try {
    const dbPostData = await Post.create({
      title: req.body.title,
      text: req.body.text,
      user_id: req.body.userId,
    });
    res.status(200).json(dbPostData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// update a post
router.put('/:id', async (req, res) => {
  try {
    const dbPostData = await Post.update(
      {
        title: req.body.title,
        text: req.body.text,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(dbPostData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// delete a post
router.delete('/:id', async (req, res) => {
  try {
    const deletedPost = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(deletedPost);
  } catch (error) {
    res.status(404).json(error);
  }
});

// retrieve posts to test
router.get('/', async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      // we want to include the users name, so we retrieve that as well
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    // return as a json object
    res.status(200).json(dbPostData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// retrieve a single post with the user and associated comments
router.get('/:id', async (req, res) => {
  try {
    // retrieve the post info
    const dbPostData = await Post.findByPk(req.params.id, {
      include: [
        {
          // retrieve the user that wrote the post
          model: User,
          attributes: ['username'],
        },
        {
          // retrieve the comments of the post
          model: Comment,
          attributes: ['text', 'date', 'user_id'],
          include: [
            {
              // retrieve the user that wrote the comment
              model: User,
              attributes: ['username'],
            },
          ],
        },
      ],
    });
    res.status(200).json(dbPostData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
