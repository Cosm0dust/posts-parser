require('dotenv').config();
require('./worker');

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Post = require('./models/Post');
const connectDB = require('./config/db');
const app = express();
const PORT = process.env.PORT || 5002; 



app.use(cors());
app.use(express.json());

connectDB();

app.get('/api/posts', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 4;
    const totalPosts = await Post.countDocuments();
    const posts = await Post.find()
      .sort({ pubDate: -1 }) 
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.json({ posts, totalPosts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'An error occurred while fetching posts' });
  }
});

app.get('/api/posts/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'An error occurred while fetching the post' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});