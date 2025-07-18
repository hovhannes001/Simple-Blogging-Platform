const Post = require('../models/post');

const createPost = async (req, res) => {
  try {
    const { title, content, categories = [], tags = [] } = req.body;
    const author = req.user.id;

    const post = new Post({ title, content, categories, tags, author });
    await post.save();

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const { category, tag } = req.query;
    let query = {};
    if (category) query.categories = category;
    if (tag) query.tags = tag;

    const posts = await Post.find(query)
      .populate('author', 'username email')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
      .populate('author', 'username email')
      .lean();

    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.likesCount = post.likes.length;
    post.dislikesCount = post.dislikes.length;

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const userId = req.user.id;

    if (!post.likes.includes(userId)) {
      post.likes.push(userId);
      post.dislikes = post.dislikes.filter(id => id.toString() !== userId);
      await post.save();
    }

    res.json({ message: 'Post liked' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const dislikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const userId = req.user.id;

    if (!post.dislikes.includes(userId)) {
      post.dislikes.push(userId);
      post.likes = post.likes.filter(id => id.toString() !== userId);
      await post.save();
    }

    res.json({ message: 'Post disliked' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createPost, getPosts, getPostById, likePost, dislikePost };
