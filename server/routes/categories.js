import express from 'express';
import {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory
} from '../controllers/categoryController.js';
import { categoryValidation } from '../middleware/validation.js';

const router = express.Router();

router.route('/')
  .get(getCategories)
  .post(categoryValidation, createCategory);

router.route('/:id')
  .get(getCategory)
  .put(categoryValidation, updateCategory)
  .delete(deleteCategory);

export default router;
