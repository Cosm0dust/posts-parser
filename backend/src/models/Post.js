const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: String,
    link: String,
    pubDate: Date,
    description: String,
    thumbnail: String,
    content: String,
    source: String,
    creator: String
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
