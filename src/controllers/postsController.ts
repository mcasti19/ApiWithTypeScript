import { Request, Response } from "express";
import { PostsService } from "../services/postsServices";
import { PostsRepository } from "../repositories/postsRepositories";
import { IPostsRepository, IPostsService, Posts } from "types/PostsTypes";

const postsRepository: IPostsRepository = new PostsRepository();
const postsService: IPostsService = new PostsService(postsRepository);

export const findPosts = async (req: Request, res: Response): Promise<void> => {
  console.log("req findPosts:>> ", req.currentUser);
  try {
    const Posts = await postsService.findPosts();
    if (Posts.length === 0) {
      res.status(404).json({ message: "no Posts Found." });
      return
    }

    res.json(Posts);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};

export const findPostsById = async (req: Request, res: Response): Promise<void> => {
  try {
    const Posts = await postsService.findPostsById(req.params.id);

    if (!Posts) {
      res.status(404).json({ message: "Not role Found" });
      return
    }
    res.json(Posts);

  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};

export const createPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const newRole: Posts = req.body;
    const result = await postsService.createPosts(newRole);

    res.status(201).json(result);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(400).json(error);
  }
};

export const updatePosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const Posts = await postsService.updatePosts(req.params.id, req.body);
    if (!Posts) {
      res.status(404).json({ message: "Not user Found" });
      return
    }
    res.json(Posts);

  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};

export const deletePosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const Posts = await postsService.deletePosts(req.params.id);
    if (!Posts) {
      res.status(404).json({ message: "Not user Found" });
      return
    }
    res.json(Posts);

  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};