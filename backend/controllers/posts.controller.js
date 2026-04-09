import User from "../models/user.model.js";
import Post from "../models/posts.model.js";
import Comment from "../models/comments.model.js";

export const activeCheck = async (req, res) => {
  res.status(200).json({ message: "Running!" });
};

export const createPost = async (req, res) => {
  const { token } = req.body;
  try {
    const user = await User.findOne({ token });
    if (!user) {
      res.status(404).json({ message: "User not found!" });
      return;
    }

    const post = new Post({
      userId: user._id,
      body: req.body.body,
      media: req.file != undefined ? req.file.filename : "",
      fileType: req.file != undefined ? req.file.mimetype.split("/")[1] : "",
    });
    await post.save();
    return res.status(200).json({ message: "Post Created!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate(
      "userId",
      "name username email profilePicture",
    );
    return res.json({ posts });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const deletePost = async (req, res) => {
  const { token, post_id } = req.body;
  try {
    const user = await User.findOne({ token: token }).select("_id");
    if (!user) {
      res.status(404).json({ message: "User not found!" });
      return;
    }
    const post = await Post.findOne({ _id: post_id });
    if (!post) {
      res.status(404).json({ message: "Post not found!" });
      return;
    }

    if (post.userId.toString() !== user._id.toString()) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    await Post.deleteOne({ _id: post._id }); // check
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const commentPost = async (req, res) => {
  const { token, post_id, commentBody } = req.body;

  try {
    const user = await User.findOne({ token: token }).select("_id");
    if (!user) {
     return res.status(404).json({ message: "User not found!" });
    }

    const post = await Post.findOne({ _id: post_id });
    if (!post) {
     return res.status(404).json({ message: "Post not found!" });
    }
    const comment = new Comment({
      userId: user._id,
      postId: post_id,
      body: commentBody,//check!
    });
    await comment.save();
    res.status(200).json({ message: "Comment Added!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};



export const get_comments_by_post = async (req,res)=>{
    const {post_id} = req.body;
    try{
        const post = await Post.findOne({_id : post_id});
        if(!post){
            res.status(404).json({message : "Post not found!"});
            return;
        }
         const comments = await Comment.find({ postId: post_id });
        return res.status(200).json({comments})
    }catch(err){
        return res.status(500).json({message : err.message})
    }
}



export const delete_comment_of_user = async (req,res)=>{
    const {token, comment_id} = req.body;

    try{
        
    }
}