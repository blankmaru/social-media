const router = require('express').Router();
const db = require('../models/index');
const Comment = db.comment;

router.route('/:id').get((req, res) => {
    Comment.findById(req.params.id)
        .then(comments => {
            res.json(comments)
        })
        .catch(err => res.status(400).json({ error: err }));
});

router.route('/add').post((req, res) => {
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

    newComment.save()
        .then(() => res.json('Comment added'))
        .catch(err => {
            res.status(404).json({ error: err });
            console.log(req.body.author);
        });
});

module.exports = router;