import { FC } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaBtc, FaSignOutAlt } from 'react-icons/fa'
import { useAuth } from '../hooks/useAuth'
import { useAppDispatch } from '../store/hooks'
import { logout } from '../store/user/userSlice'
import { removeTokenFromLocalStorage } from '../helpers/localstorage.helper'
import { toast } from 'react-toastify'
import {useSelector} from "react-redux";
import {RootState} from "../store/store.ts";

const Header: FC = () => {
	const isAuth = useAuth()
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const user = useSelector((state: RootState) => state.user.user)

	const logoutHandler = () => {
		dispatch(logout())
		removeTokenFromLocalStorage('token')
		toast.success('You logged out.')
		navigate('/')
	}

	return (
		<header className="flex items-center  bg-slate-800 p-4 shadow-sm backdrop-blur-sm">
			<Link to="/">
				<FaBtc size={20} />
			</Link>

			{/* Menu */}
			{isAuth && (
				<nav className="ml-auto mr-10 ">
					<ul className="flex items-center gap-5">
						<li>
							<NavLink
								to={'/'}
								className={({isActive}) =>
									isActive ? 'text-white' : 'text-white/50'
								}
							>
								Home
							</NavLink>
						</li>
						<li>
							<NavLink
								to={'/transactions'}
								className={({isActive}) =>
									isActive ? 'text-white' : 'text-white/50'
								}
							>
								Transactions
							</NavLink>
						</li>
						<li>
							<NavLink
								to={'/categories'}
								className={({isActive}) =>
									isActive ? 'text-white' : 'text-white/50'
								}
							>
								Categories
							</NavLink>
						</li>
						<li>
							<NavLink
								to={'/profile'}
								className={({isActive}) =>
									isActive ? 'text-white' : 'text-white/50'
								}
							>
								Profile
							</NavLink>
						</li>
						{user.role === "SUPERADMIN" && (
							<li>
								<NavLink
									to={'/add-event'}
									className={({ isActive }) =>
										isActive ? 'text-white' : 'text-white/50'
									}
								>
									Add Event
								</NavLink>
							</li>
						)}
						{user.role === "SUPERADMIN" && (
							<li>
								<NavLink
									to={'/admin-panel'}
									className={({ isActive }) =>
										isActive ? 'text-white' : 'text-white/50'
									}
								>
									Admin Panel
								</NavLink>
							</li>
						)}
					</ul>
				</nav>
			)}

			{/* Actions */}
			{isAuth ? (
				<button className="btn btn-red" onClick={logoutHandler}>
					<span>Log Out</span>
					<FaSignOutAlt/>
				</button>
			) : (
				<Link
					className="ml-auto py-2 text-white/50 hover:text-white"
					to={'auth'}
				>
					Log In / Sing In
				</Link>
			)}
		</header>
	)
}

export default Header
