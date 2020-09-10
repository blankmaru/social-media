const router = require('express').Router();
const db = require('../models/index');
const Comment = db.comment;
const Post = db.post;

router.route('/:id').get((req, res) => {
    Comment.findById(req.params.id)
        .then(comments => {
            res.json(comments)
        })
        .catch(err => res.status(400).json({ error: err }));
});

router.route('/add/:id').post((req, res) => {
    Post.findById(req.params.id).then(post => {
        const userAvatar = req.body.userAvatar;
        const content = req.body.content;
        const author = req.body.author;
        const likes = req.body.likes;
        const dislikes = req.body.dislikes;
        const date = req.body.date;

        const newComment = new Comment({
            userAvatar,
            content,
            author,
            likes,
            dislikes,
            date
        });

        post.comments.push(newComment);
        post.save()
            .then(res => res.json('Comment added'))
            .catch(err => res.status(400).json({ error: err }))
    })
});

module.exports = router;