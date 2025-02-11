"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
class PostsService {
    constructor(PostsRepository) {
        this.PostsRepository = PostsRepository;
    }
    async createPosts(posts) {
        return this.PostsRepository.create(posts);
    }
    async findPosts(query) {
        return this.PostsRepository.find(query);
    }
    async findPostsById(id) {
        return this.PostsRepository.findById(id);
    }
    async updatePosts(id, posts) {
        return this.PostsRepository.update(id, posts);
    }
    async deletePosts(id) {
        return this.PostsRepository.delete(id);
    }
}
exports.PostsService = PostsService;
