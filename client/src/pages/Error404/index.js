import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/react'
import React from 'react'

function Error404() {
    return (
        <div>
            <Alert status='error'>
                <AlertIcon />
                <AlertTitle>404 NOT FOUND Error is outdated!</AlertTitle>
                <AlertDescription>There is no such page.</AlertDescription>
            </Alert>
        </div>
    )
}

export default Error404
