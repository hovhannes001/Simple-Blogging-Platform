const Post = require('../modules/post');

const addComment = async (req, res) => {
  try {
    const { content, parentCommentId } = req.body;
    const postId = req.params.postId;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const newComment = {
      content,
      author: userId,
      parentComment: parentCommentId || null,
    };

    post.comments.push(newComment);
    await post.save();

    res.status(201).json({ message: 'Comment added successfully', post });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getCommentsByPost = async (req, res) => {
  try {
    const postId = req.params.postId;

    const post = await Post.findById(postId).populate('comments.author', 'username email');
    if (!post) return res.status(404).json({ message: 'Post not found' });

    res.json(post.comments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { addComment, getCommentsByPost };
