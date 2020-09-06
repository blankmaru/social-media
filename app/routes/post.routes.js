const router = require('express').Router();
const db = require('../models/index');
const Post = db.post;

router.route('/').get((req, res) => {
    Post.find()
        .then(posts => res.json(posts))
        .catch(err => console.error(err));
});

module.exports = router;