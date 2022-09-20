import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    likeBlogRed (state, action) {
      const [ id, updatedBlog ] = action.payload
      return state.map( blog => blog.id !== id ? blog : updatedBlog )
    },
    setBlogs (state, action) {
      return action.payload
    },
    appendBlog (state, action) {
      state.push(action.payload)
    },
    commentBlog (state, action) {
      const [id, updatedBlog] = action.payload
      return state.map(blog => blog.id !== id ? blog : updatedBlog)
    },
    deleteBlog (state, action) {
      const id = action.payload
      return state.filter(blog => blog.id !== id)
    }
  }
})

export const { setBlogs, appendBlog, likeBlogRed, commentBlog, deleteBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = (id, updatedBlog) => {
  return async dispatch => {
    const blogToUpdate = {
      title: updatedBlog.title,
      url: updatedBlog.url,
      likes: updatedBlog.likes,
      author: updatedBlog.author,
    }
    await blogService.update(id, blogToUpdate)
    dispatch(likeBlogRed([ id, updatedBlog]))
  }
}

export const blogComment = (id, comment) => {
  return async dispatch => {
    console.log('id === ', id)
    console.log('comment ==== ', comment)
    const updatedBlog = await blogService.commentBlog(id, comment)
    console.log('updated === ', updatedBlog)
    dispatch(commentBlog([id, updatedBlog]))
  }
}

export const blogDelete = (id) => {
  return async dispatch => {
    await blogService.deleteBlog(id)
    dispatch(deleteBlog(id))
  }
}

export default blogSlice.reducer