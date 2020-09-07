const router = require('express').Router();
const db = require('../models/index');
const Comment = db.comment;

router.route('/:id').get((req, res) => {
    Comment.findById(req.params.id)
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json({ error: err }));
});

router.route('/add').post((req, res) => {
    const newComment = new Comment({
        userAvatar: req.body.userAvatar,
        content: req.body.content,
        author: req.body.author,
        likes: req.body.likes,
        dislikes: req.body.dislikes,
        date: req.body.date
    });

    newComment.save()
        .then(res => res.status(200).json({ msg: 'Comment added' }))
        .catch(err => res.status(404).json({ error: err }));
});

module.exports = router;