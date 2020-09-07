const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    userAvatar: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    likes: { type: Number, required: true },
    dislikes: { type: Number, required: true },
    date: { type: Date, required: true }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;