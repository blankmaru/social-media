const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    userAvatar: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    likes: { type: Number, required: true },
    dislikes: { type: Number, required: true },
    date: { type: Date }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;