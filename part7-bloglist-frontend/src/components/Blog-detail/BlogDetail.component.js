import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog } from '../../reducers/blogReducer'
import { setNotification } from '../../reducers/notificationReducer'
import { blogComment, blogDelete } from '../../reducers/blogReducer'
import { useNavigate } from 'react-router-dom'

const BlogDetail = ({ blog }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)

  const [comment, setComment] = useState('')

  const likeHandler = (id, blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    console.log('id === ', id)
    console.log('blog === ', updatedBlog)
    dispatch(likeBlog(id, updatedBlog))
    dispatch(setNotification(`you have liked ${updatedBlog.title}`, 'success', 3))
  }

  const blogDeleteHandler = () => {
    let path = '/'
    if (window.confirm(`Delete blog ${blog.title}! by ${blog.author}`)){
      const id = blog.id
      dispatch(blogDelete(id))
      dispatch(setNotification(`deleted ${blog.title}`, 'success', 3))
      navigate(path)
    }
  }

  const commentHandler = (event) => {
    event.preventDefault()
    console.log('comment === ', comment)
    setComment('')
    dispatch(blogComment(blog.id, comment))
    dispatch(setNotification('added comment!', 'success', 3))
  }

  if(!blog) {
    return null
  }
  return (
    <div className="mt-4">
      {console.log('user : ', user)}
      {console.log('blog : ', blog )}
      <h2>{blog.title}</h2>
      <div>
        <a href={`https://${blog.url}`} target="_blank" rel="noreferrer">{blog.url}</a>
      </div>
      <div>
        Likes: {blog.likes} <Button variant="success" size="sm" onClick={() => likeHandler(blog.id, blog)}>Like</Button>
      </div>
      <p>added by {blog.author}</p>
      {(blog.user.username === user.username) ? <Button variant="danger" size="sm" onClick={blogDeleteHandler}>delete</Button> : null}
      <div>
        <h5 style={{ marginTop: 30 }}>Comments</h5>
        <div>
          <form onSubmit={commentHandler}>
            Add comment <input name="comment" value={comment} onChange={(event) => setComment(event.target.value)} />
            <Button style={{ marginLeft: 5 }} variant="secondary" size="sm" type="submit">Submit</Button>
          </form>
        </div>
        <hr style={{ width: 120 }}/>
        {
          blog.comments.length > 0
            ? blog.comments.map((comment, i) => {
              return (
                <p key={i}>- {comment}</p>
              )
            })
            : <p>-- No comments -- </p>
        }
      </div>
    </div>
  )
}

export default BlogDetail