import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { initializeUser, initializeAllUsers, loginUser, logoutUser } from './reducers/userReducer'
import Blogs from './components/Blogs/Blogs.component'
import BlogForm from './components/BlogForm/BlogForm.component'
import Notification from './components/Notification/Notification.component'
import Togglable from './components/Togglable/Togglable.component'
import Menu from './components/Menu/Menu.component'
import { Route, Routes, useMatch } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Users from './components/Users/Users.component'
import UserDetail from './components/UserDetail/UserDetail.component'
import BlogDetail from './components/Blog-detail/BlogDetail.component'
import store from './store'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  useEffect(() => {
    dispatch(initializeAllUsers())
  }, [])

  const userObj = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = useRef()

  const loginHandler = async (e) => {
    e.preventDefault()
    const credentials = {
      username,
      password
    }
    try {
      dispatch(loginUser(credentials))
      setUsername('')
      setPassword('')
      dispatch(setNotification('successfully logged in', 'success', 3))
    }catch(exception){
      dispatch(setNotification('wrong username or password', 'error', 3))
    }
  }

  const createBlogHandler = async (newBlog) => {
    try{
      blogFormRef.current.toggleVisibility()
      dispatch(createBlog(newBlog))
      dispatch(setNotification(`added a new blog ${newBlog.title} by ${newBlog.author}`, 'success', 3))
    }catch(exception) {
      dispatch(setNotification('unable to add the blog'))
    }
  }

  const logoutHandle = () => {
    dispatch(logoutUser())
  }

  console.log('store state === ', store.getState())

  const match = useMatch('/users/:id')
  const userFound = userObj.users ? (match
    ? userObj.users.find(user => user.id === match.params.id)
    : null) : null

  const match1 = useMatch('/blogs/:id')
  const blogFound = blogs ? (match1
    ? blogs.find(blog => blog.id === match1.params.id)
    : null) : null

  if(userObj.user === null){
    return(
      <div>
        <Notification />
        <h2>Log in to application</h2>
        <form onSubmit={loginHandler}>
          <div>
            Username
            <input
              id="username"
              type="text"
              name="username"
              onChange={(event) => setUsername(event.target.value)}/>
          </div>
          <div>
            Password
            <input
              id="password"
              type="password"
              name="password"
              onChange={(event) => setPassword(event.target.value)}/>
          </div>
          <button id="login-button" type='submit'>Login</button>
        </form>
      </div>
    )
  }

  const padding = {
    padding: 5
  }
  return (
    <div>
      <Container style={padding}>
        <Menu user={userObj.user} logoutHandler={logoutHandle} />
        <Notification />
        <Togglable buttonLabel="add new blog" ref={blogFormRef}>
          <BlogForm createBlog={createBlogHandler} />
        </Togglable>
        <Routes>
          <Route path="/users/:id" element={<UserDetail user={userFound} />}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/blogs/:id" element={<BlogDetail blog={blogFound} />}></Route>
          <Route path="/" element={<Blogs />}></Route>
        </Routes>

        <div style={{ marginTop: 30 }}>
          <hr/>
          <footer>© 2022, All Rights Reserved.</footer>
        </div>
      </Container>
    </div>
  )
}

export default App

