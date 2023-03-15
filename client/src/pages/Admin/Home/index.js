import { Text } from '@chakra-ui/react'
import React from 'react'
import { useAuth } from '../../../contexts/AuthContext'
function Home() {
    const { user } = useAuth()
    return (
        <div>

            <Text fontSize="6xl" color={"GrayText"} >Well come to {user.role}</Text>
            <Text fontSize="3xl">Bilgileriniz {user.email}</Text>
        </div>
    )
}

export default Home
