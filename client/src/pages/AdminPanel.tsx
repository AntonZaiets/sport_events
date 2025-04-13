import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import axios from 'axios'
import {IUser} from "../types/types.ts";

const AdminPanel: FC = () => {
    const user = useSelector((state: RootState) => state.user.user)
    const [users, setUsers] = useState<IUser[]>([])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get('http://localhost:3001/api/user')
                setUsers(res.data)
            } catch (err) {
                console.error('Error fetching users:', err)
            }
        }

        if (user && user.role === 'SUPERADMIN') {
            fetchUsers()
        }
    }, [user])


    const handleRoleChange = async (uid: number, newRole: string) => {
        try {
            await axios.patch(`http://localhost:3001/api/user/${uid}/role`, {
                role: newRole,
            })

            // Оновлюємо локальний стейт
            setUsers(prevUsers =>
                prevUsers.map(u =>
                    u.uid === uid ? { ...u, role: newRole } : u
                )
            )
        } catch (err) {
            console.error('Error updating role:', err)
        }
    }


    return (
        <div style={{ padding: '2rem' }}>
            <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

            {users.length ? (
                <table className="w-full border-collapse">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2 bg-amber-300">ID</th>
                        <th className="border p-2 bg-amber-300">Email</th>
                        <th className="border p-2 bg-amber-300">UID</th>
                        <th className="border p-2 bg-amber-300">Role</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((u) => (
                        <tr key={u.id}>
                            <td className="border p-2">{u.id}</td>
                            <td className="border p-2">{u.email}</td>
                            <td className="border p-2">{u.uid}</td>
                            <td className="border p-2">
                                <select
                                    value={u.role}
                                    onChange={e => handleRoleChange(u.uid, e.target.value)}
                                    className="border px-2 py-1 rounded bg-amber-300 w-full"
                                >
                                    <option value="USER">USER</option>
                                    <option value="ADMIN">ADMIN</option>
                                    <option value="SUPERADMIN">SUPERADMIN</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>Loading users...</p>
            )}
        </div>
    )
}

export default AdminPanel
