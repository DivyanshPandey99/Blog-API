const Post = require('../models/post');

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
    } else {
      res.json(post);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, content, category, keywords, user } = req.body;
    const post = await Post.create({
      title,
      content,
      category,
      keywords,
      user,
      created_at: new Date(),
    });
    res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category, keywords } = req.body;
    const post = await Post.findByPk(id);
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
    } else {
      await post.update({
        title,
        content,
        category,
        keywords,
      });
      res.json({ message: 'Post updated successfully', post });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
    } else {
      await post.destroy();
      res.json({ message: 'Post deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
