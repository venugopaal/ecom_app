import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  token: string | null
  user?: { id: string; name: string }
}

const initialState: AuthState = { token: null }

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string; user: { id: string; name: string } }>) => {
      state.token = action.payload.token
      state.user = action.payload.user
    },
    logout: (state) => {
      state.token = null
      state.user = undefined
    },
  },
})

export const { login, logout } = slice.actions
export default slice.reducer
