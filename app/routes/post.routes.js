const router = require('express').Router();
const db = require('../models/index');
const Post = db.post;

router.route('/').get((req, res) => {
    Post.find()
        .then(posts => res.json(posts))
        .catch(err => console.error(err));
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

module.exports = router;