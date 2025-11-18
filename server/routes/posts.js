import express from 'express';
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost
} from '../controllers/postController.js';
import { postValidation } from '../middleware/validation.js';

const router = express.Router();

router.route('/')
  .get(getPosts)
  .post(postValidation, createPost);

router.route('/:id')
  .get(getPost)
  .put(postValidation, updatePost)
  .delete(deletePost);

export default router;
