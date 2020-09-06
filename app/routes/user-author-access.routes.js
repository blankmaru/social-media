const router = require('express').Router()
const db = require('../models/index');
const User = db.user;

router.route('/api/test/author/:id').post((req, res) => {
    User.findById(req.params.id)
        .then((user) => res.json(user))
        .catch(err => res.status(400).json({ error: err }));
})

module.exports = router;