import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
import userService from '../services/users'

const initialState = {
  user: null,
  users: null
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers (state, action) {
      state.users = action.payload
      return state
    },
    setUser (state, action) {
      state.user = action.payload
      return state
    },
    /* eslint-disable */
    removeUser (state, action) {
      return initialState
    }
    /* eslint-enable */
  }
})

export const { setUsers, setUser, removeUser } = userSlice.actions

export const initializeAllUsers = () => {
  return async dispatch => {
    const users = await userService.getAllUsers()
    dispatch(setUsers(users))
  }
}

export const initializeUser = () => {
  return async dispatch => {
    const loggenInUser = window.localStorage.getItem('loggedInUser')
    if(loggenInUser){
      const user = JSON.parse(loggenInUser)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }
}

export const loginUser = credentials => {
  return async dispatch => {
    const user = await loginService.loginUser(credentials)
    window.localStorage.setItem(
      'loggedInUser', JSON.stringify(user)
    )
    dispatch(setUser(user))
  }
}

export const logoutUser = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedInUser')
    blogService.removeToken()
    dispatch(removeUser())
  }
}

export default userSlice.reducer