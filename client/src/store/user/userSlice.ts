import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../types/types'

// Define the initial state using that type
const storedUser = localStorage.getItem('user')
console.log('🧠 Init from localStorage:', storedUser)
const initialState = {
	user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
	isAuth: localStorage.getItem('user') ? true : false,
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action: PayloadAction<IUser>) => {
			console.log('LOGIN ACTION PAYLOAD:', action.payload)
			state.user = action.payload
			state.isAuth = true
			// Зберігаємо користувача в localStorage
			localStorage.setItem('user', JSON.stringify(action.payload))
		},
		logout: (state) => {
			state.isAuth = false
			state.user = null
			// Видаляємо користувача з localStorage при лог-ауті
			localStorage.removeItem('user')
		},
	},
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer
