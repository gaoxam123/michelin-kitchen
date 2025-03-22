import { createSlice } from '@reduxjs/toolkit'

// following contains username, profilePicture, id of users
const initialUserState = { id: null, isAuthenticated: false, username: null, profilePicture: null, following: []}

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        login(state, action) {
            state.isAuthenticated = true
            state.username = action.payload.username
            state.profilePicture = action.payload.profilePicture
            state.id = action.payload.id
        },
        logout(state) {
            state.isAuthenticated = false
            state.username = null
            state.profilePicture = null
            state.following = []
            state.id = null
        }
    }
})

export const userActions = userSlice.actions
export default userSlice.reducer