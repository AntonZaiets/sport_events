import { instance } from '../api/axios.api'
import { IResponseUserData, IUser, IUserData } from '../types/types'

export const AuthService = {
	async registration(
		userData: IUserData
	): Promise<IResponseUserData | undefined> {
		const { data } = await instance.post<IResponseUserData>('user', userData)
		return data
	},
	async login(userData: IUserData): Promise<IUser | undefined> {
		const { data } = await instance.post<IUser>('auth/login', userData)
		console.log('11111111111111111111111111111111', data);
		// Зберігаємо токен та дані користувача в localStorage
		if (data) {
			localStorage.setItem('user', JSON.stringify(data))
			localStorage.setItem('token', data.token)
		}

		return data
	},
	async getProfile(): Promise<IUser | undefined> {
		const { data } = await instance.get<IUser>('auth/profile')
		if (data) return data
	},
}
