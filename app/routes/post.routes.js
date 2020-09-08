const router = require('express').Router();
const db = require('../models/index');
const { Mongoose } = require('mongoose');
const Post = db.post;
const ObjectId = require('mongoose').ObjectId;

router.route('/').get((req, res) => {
    Post.find()
        .then(posts => res.json(posts))
        .catch(err => console.error(err));
});

router.route('/:id').get((req, res) => {
    Post.findById(req.params.id).then(post => {
        res.json(post);
    })
    .catch(err => res.status(400).json({ error: err }))
});

router.route('/add').post((req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const author = req.body.author;
    const likes = req.body.likes;
    const comments = req.body.comments;

    const newPost = new Post({
        title,
        content,
        author,
        likes,
        comments
    });

    newPost
        .save()
        .then(() => res.json('Post added'))
        .catch(err => console.error(err));
});

router.route('/:id').delete((req, res) => {
    Post.findByIdAndDelete(req.params.id)
        .then(() => res.json('Post deleted'))
        .catch(err => res.status(400).json({ error: err }));
});

router.route('/update/:id').post((req, res) => {
    Post.findById(req.body.id).then(post => {
        post.title = req.body.title;
        post.content = req.body.content;

        post
            .save()
            .then(() => res.json('Post updated'))
            .catch(err => res.status(400).json({ error: err })); 
    });
});

router.route('/api/comments/posts/:id').post((req, res) => {
    Post.findById(req.params.id).then(post => {
        post.comments.push(req.body.comment);

        post.save()
            .then(() => res.json('Comment added to the post'))
            .catch(err => res.status(400).json({ error: err }));
    });
});

module.exports = router;