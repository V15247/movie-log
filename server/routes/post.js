const router = require('express').Router();
const Post = require('../models/Post');
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();  
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const verify = require('../verifyToken');
const { validateCreatePost } = require('../validation/postValidate');


//Create a user post

router.post('/', jsonParser, async (req, res) => {

    const { err } = validateCreatePost(req.body);
    if (error) return res.status(400).send(error);

    const post = new Post( {
        movieName: req.body.movieName,
        description: req.body.description,
        rating: req.body.rating,
    })
    try{
        const savedPost = await post.save();
        res.send('Post was successfully created!');
    }catch(err) {
        res.status(400).send(err);
    }
});

//Update a user post

router.put('/:id', jsonParser, verify , async (req, res) => {

    const { err } = validateCreatePost(req.body);
    if (err) return res.status(400).send(err);

    try {
      const post = await Post.findById(req.params.id);
      if (post.postId === req.body.postId) {
        await post.updateOne({ $set: req.body });
        res.send("the post has been updated");
      } else {
        res.send("You cannot update this post");
      }
    } catch (err) {
      res.status(400).send(err);
    }
  });

//Get a certain user post

router.get('/:id', jsonParser, verify, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.send("Successfully obtained this post");
    } catch (err) {
      res.status(400).send(err);
    }
  });

//Delete a user post
router.delete('/:id', jsonParser, verify, async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.postId === req.body.postId) {
            await post.deleteOne();
            res.send("this post has been deleted")
        } else {
            res.send("you cannot delete this post")
    } 
    } catch (err) {
        res.status(400).send(err);
    }
});



module.exports = router;

