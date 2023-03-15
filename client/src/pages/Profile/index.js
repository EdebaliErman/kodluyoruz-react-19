import { Button, Text } from '@chakra-ui/react'
import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

function Profile() {
    const { user, logout } = useAuth()
    const navigate = useNavigate();
    const handleLogout = async () => {
        logout(() => {
            navigate("/")
        })
    }

    return (
        <div>

            <Text as="b" fontSize='2xl'>Profile</Text>
            <br />
            <code>
                {JSON.stringify(user)}
            </code>

            <Button
                colorScheme="red"
                variant="solid"
                onClick={handleLogout}
            >Logout</Button>
        </div>
    )
}

export default Profile
