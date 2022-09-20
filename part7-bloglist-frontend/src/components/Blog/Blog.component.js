// import { useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { likeBlog } from '../../reducers/blogReducer'
// import { setNotification } from '../../reducers/notificationReducer'

import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  // const dispatch = useDispatch()
  // const [isViewClicked, setIsViewClicked] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 10
  }

  // const blogDetailStyle = {
  //   margin: 0
  // }

  // const blogDeleteBtn = {
  //   backgroundColor: 'blue'
  // }

  // const toggleViewBtn = () => {
  //   setIsViewClicked(!isViewClicked)
  // }

  // const blogDetailHandler = () => {
  //   toggleViewBtn()
  //   console.log('clicked : ', isViewClicked)
  // }

  // const likeHandler = (id, blog) => {
  //   const updatedBlog = {
  //     ...blog,
  //     likes: blog.likes + 1
  //   }
  //   console.log('id === ', id)
  //   console.log('blog === ', updatedBlog)
  //   dispatch(likeBlog(id, updatedBlog))
  //   dispatch(setNotification(`you have liked ${updatedBlog.title}`, 'success', 3))
  // }

  // const blogDeleteHandler = () => {
  //   if (window.confirm(`Delete blog ${blog.title}! by ${blog.author}`)){
  //     const id = blog.id
  //     blogDelete(id)
  //   }
  // }
  const linkStyle = {
    textDecoration: 'none',
  }

  return(
    <div style={blogStyle} className='blogDetail'>
      <div>
        <Link style={linkStyle} to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
      </div>
      {/* {
        isViewClicked ?
          <div>
            <p style={blogDetailStyle}>{blog.url} <br/>{blog.likes} <button onClick={() => likeHandler(blog.id, blog)}>like</button> <br/> {blog.user.name}</p>
            {
              (blog.user.username === user.username) ? <button style={blogDeleteBtn} onClick={blogDeleteHandler}>delete</button> : null
            }
          </div>
          :
          null
      } */}
    </div>
  )
}

export default Blog