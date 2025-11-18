import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { blogService } from '../services/blogService';

const BlogContext = createContext();

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_POSTS':
      return { ...state, posts: action.payload };
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'ADD_POST':
      return { ...state, posts: [action.payload, ...state.posts] };
    case 'UPDATE_POST':
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === action.payload._id ? action.payload : post
        )
      };
    case 'DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const initialState = {
  posts: [],
  categories: [],
  loading: false,
  error: null
};

export const BlogProvider = ({ children }) => {
  const [state, dispatch] = useReducer(blogReducer, initialState);

  const fetchPosts = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const posts = await blogService.getPosts();
      dispatch({ type: 'SET_POSTS', payload: posts });
      dispatch({ type: 'SET_ERROR', payload: null });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const fetchCategories = async () => {
    try {
      const categories = await blogService.getCategories();
      dispatch({ type: 'SET_CATEGORIES', payload: categories });
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const createPost = async (postData) => {
    try {
      const newPost = await blogService.createPost(postData);
      dispatch({ type: 'ADD_POST', payload: newPost });
      return newPost;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const updatePost = async (id, postData) => {
    try {
      const updatedPost = await blogService.updatePost(id, postData);
      dispatch({ type: 'UPDATE_POST', payload: updatedPost });
      return updatedPost;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const deletePost = async (id) => {
    try {
      await blogService.deletePost(id);
      dispatch({ type: 'DELETE_POST', payload: id });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  return (
    <BlogContext.Provider value={{
      ...state,
      fetchPosts,
      fetchCategories,
      createPost,
      updatePost,
      deletePost
    }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};
