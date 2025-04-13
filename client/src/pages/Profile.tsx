import { FC } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

const Profile: FC = () => {
    const user = useSelector((state: RootState) => state.user.user)
    console.log('data', user)
    console.log('uid', user.uid);
    console.log('id', user.id);

    return (
        <div style={{ padding: '2rem' }}>
            <h1>User Profile</h1>
            <p><strong>ID:</strong> {user.uid}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
        </div>
    )
}

export default Profile
