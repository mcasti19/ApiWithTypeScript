"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePosts = exports.updatePosts = exports.createPosts = exports.findPostsById = exports.findPosts = void 0;
const postsRepositories_1 = require("@repositories/postsRepositories");
const postsServices_1 = require("@services/postsServices");
const postsRepository = new postsRepositories_1.PostsRepository();
const postsService = new postsServices_1.PostsService(postsRepository);
const findPosts = async (req, res) => {
    console.log("req findPosts:>> ", req.currentUser);
    try {
        const Posts = await postsService.findPosts();
        if (Posts.length === 0)
            return res.status(404).json({ message: "no Posts Found." });
        res.json(Posts);
    }
    catch (error) {
        console.log("error :>> ", error);
        res.status(500).json(error);
    }
};
exports.findPosts = findPosts;
const findPostsById = async (req, res) => {
    try {
        const Posts = await postsService.findPostsById(req.params.id);
        if (!Posts)
            return res.status(404).json({ message: "Not role Found" });
        res.json(Posts);
    }
    catch (error) {
        console.log("error :>> ", error);
        res.status(500).json(error);
    }
};
exports.findPostsById = findPostsById;
const createPosts = async (req, res) => {
    try {
        const newRole = req.body;
        const result = await postsService.createPosts(newRole);
        res.status(201).json(result);
    }
    catch (error) {
        console.log("error :>> ", error);
        res.status(400).json(error);
    }
};
exports.createPosts = createPosts;
const updatePosts = async (req, res) => {
    try {
        const Posts = await postsService.updatePosts(req.params.id, req.body);
        if (!Posts)
            return res.status(404).json({ message: "Not user Found" });
        res.json(Posts);
    }
    catch (error) {
        console.log("error :>> ", error);
        res.status(500).json(error);
    }
};
exports.updatePosts = updatePosts;
const deletePosts = async (req, res) => {
    try {
        const Posts = await postsService.deletePosts(req.params.id);
        if (!Posts)
            return res.status(404).json({ message: "Not user Found" });
        res.json(Posts);
    }
    catch (error) {
        console.log("error :>> ", error);
        res.status(500).json(error);
    }
};
exports.deletePosts = deletePosts;
