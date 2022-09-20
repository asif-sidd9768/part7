import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    showNotification(state, action) {
      console.log(action.payload)
      const content = action.payload
      return content
    },
    hideNotification(state, action){
      console.log(state, action)
      return initialState
    }
  }
})

export const { showNotification, hideNotification } = notificationSlice.actions

export const setNotification = (content, style, time) => {
  return async dispatch => {
    dispatch(showNotification([content, style]))
    setTimeout(() => {
      dispatch(hideNotification())
    }, time*1000)
  }
}

export default notificationSlice.reducer