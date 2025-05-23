import { createBrowserRouter } from 'react-router-dom'
import Layout from '../pages/Layout'
import ErrorPage from '../pages/ErrorPage'
import Home from '../pages/Home'
import Transactions, {
	transactionAction,
	transactionLoader,
} from '../pages/Transactions'
import Categories, {
	categoriesAction,
	categoryLoader,
} from '../pages/Categories'
import Auth from '../pages/Auth'
import { ProtectedRoute } from '../components/ProtectedRoute'
import Profile, {profileAction, profileLoader} from "../pages/Profile";
import AdminPanel from "../pages/AdminPanel.tsx";
import Event from "../pages/Event.tsx";

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: 'transactions',
				loader: transactionLoader,
				action: transactionAction,
				element: (
					<ProtectedRoute>
						<Transactions />
					</ProtectedRoute>
				),
			},
			{
				path: 'categories',
				action: categoriesAction,
				loader: categoryLoader,
				element: (
					<ProtectedRoute>
						<Categories />
					</ProtectedRoute>
				),
			},
			{
				path: 'auth',
				element: <Auth />,
			},
			{
				path: 'profile',
				element: (
					<ProtectedRoute>
						<Profile />
					</ProtectedRoute>
				),
			},
			{
				path: 'admin-panel',
				element: (
					<ProtectedRoute>
						<AdminPanel />
					</ProtectedRoute>
				),
			},
			{
				path: 'add-event',
				element: (
					<ProtectedRoute>
						<Event />
					</ProtectedRoute>
				),
			},
		],
	},
])
