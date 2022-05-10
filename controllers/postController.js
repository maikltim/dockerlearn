const Post = require("../models/postModels");


exports.getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find();
        res.status(200).json({
            status: 'success',
            results: posts.length,
            data: {
                posts
            }
        })
    } catch(e) {
        res.status(400).json({
            status: "fail",
        })
    }
};

exports.getOnePosts = async (req, res, next) => {
    try {
        const posts = await Post.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                posts
            }
        })
    } catch(e) {
        res.status(400).json({
            status: "fail",
        })
    }

}

exports.createPost = async (req, res, next) => {
    try {
        const posts = await Post.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                posts
            }
        })
    } catch(e) {
        res.status(400).json({
            status: "fail",
        })
    }
}

exports.updateOnePosts = async (req, res, next) => {
    try {
        const posts = await Post.findByIdUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: 'success',
            data: {
                posts
            }
        })
    } catch(e) {
        res.status(400).json({
            status: "fail",
        })
    }

}


exports.deleteOnePosts = async (req, res, next) => {
    try {
        const posts = await Post.findByIdDelete(req.params.id);
        res.status(200).json({
            status: 'success',
        })
    } catch(e) {
        res.status(400).json({
            status: "fail",
        })
    }

}