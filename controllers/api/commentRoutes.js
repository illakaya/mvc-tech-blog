// initialise express
const router = require('express').Router();
// retrieve Post model
const { User, Comment } = require('../../models');

// create a new comment
router.post('/', async (req, res) => {
  try {
    const dbCommentData = await Comment.create({
      text: req.body.text,
      user_id: req.session.userId,
      post_id: req.body.postId,
    });
    res.status(200).json(dbCommentData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// update a comment
router.put('/:id', async (req, res) => {
  try {
    const dbCommentData = await Comment.update(
      {
        text: req.body.text,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(dbCommentData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// delete a comment
router.delete('/:id', async (req, res) => {
  try {
    const deletedComment = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(deletedComment);
  } catch (error) {
    res.status(404).json(error);
  }
});

// retrieve comments to test
router.get('/', async (req, res) => {
  try {
    const dbCommentData = await Comment.findAll({
      // we want to include the users name, so we retrieve that as well
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    // return as a json object
    res.status(200).json(dbCommentData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// retrieve a single comment with the user and associated comments
router.get('/:id', async (req, res) => {
  try {
    // retrieve the comment info
    const dbCommentData = await Comment.findByPk(req.params.id, {
      include: [
        {
          // retrieve the user that wrote the comment
          model: User,
          attributes: ['id', 'username'],
        },
      ],
    });
    res.status(200).json(dbCommentData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
