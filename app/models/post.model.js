const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    likes: { type: Number, required: true },
    comments: { type: Number, require: true }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;