const router = require('express').Router()
const db = require('../models/index');
const User = db.user;

router.route('/api/test/author/:id').post((req, res) => {
    User.findById(req.params.id)
        .then((user) => res.json(user))
        .catch(err => res.status(400).json({ error: err }));
});

router.route('/api/user/update/:id').post((req, res) => {
    User.findById(req.params.id).then(user => {
        user.username = req.body.username;
        user.email = req.body.email;
        user.avatar = req.body.avatar;
        user.profileBg = req.body.profileBg;

        user.save()
            .then(() => res.send('User updated!'))
            .catch(err => res.status(400).json({ error: err }));

    });
});

module.exports = router;