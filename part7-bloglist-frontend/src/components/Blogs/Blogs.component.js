import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
// import { likeBlog } from '../reducers/blogReducer'
import blogService from '../../services/blogs'
import Blog from '../Blog/Blog.component'

const Blogs = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  console.log('user === ', user)

  //sorting blogs based on likes
  const sortedBlogs = [...blogs]
  sortedBlogs.sort(function(a, b) {
    var keyA = a.likes, keyB = b.likes
    if (keyA > keyB) return -1
    if (keyA < keyB) return 1
    return 0
  })

  const blogDeleteHandler = async (id) => {
    try {
      await blogService.deleteBlog(id)
      dispatch(setNotification('Successfully deleted the blog'))
    }catch(exception){
      dispatch(setNotification('unable to delete the blog'))
    }
  }

  return (
    <div>
      {sortedBlogs.map(blog =>
        <Blog user={user} blogDelete={blogDeleteHandler} key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default Blogs