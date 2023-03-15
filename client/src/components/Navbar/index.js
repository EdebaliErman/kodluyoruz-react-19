import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './styles.module.css'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { useAuth } from '../../contexts/AuthContext'
import { useBasket } from '../../contexts/BasketContext'


function Navbar() {
    const { loggedIn ,user} = useAuth()
    const { items } = useBasket()
    return (

        <nav className={styles.nav}>
            <div className={styles.left}>
                <div className={styles.logo}>
                    <NavLink to="/" >E-E-Voltra</NavLink>
                </div>

                <ul className={styles.menu}>
                    <li >
                        <NavLink to="/">Products</NavLink>
                    </li>
                </ul>
            </div>
            <div className={styles.right}>
                {
                    !loggedIn && <ButtonGroup>
                        <NavLink to="/Signin">
                            <Button colorScheme='gray'>Login</Button>
                        </NavLink>


                        <NavLink to="/Signup">
                            <Button colorScheme='gray'>Register</Button>
                        </NavLink>

                    </ButtonGroup>
                }
                {
                    loggedIn && (
                        <>
                            {items.length > 0 && (<NavLink to="/basket">
                                <Button colorScheme="yellow">Basket {items.length}</Button>
                            </NavLink>)}
                            <NavLink to="/profile">
                                <Button colorScheme='gray'>Profile</Button>

                            </NavLink>

                            {user?.role === 'admin' && 
                            <NavLink to="/admin">
                                <Button ml="7" colorScheme="blue"variant={'solid'} >admin</Button>
                            </NavLink>
                            }
                
                
            


                        </>

                    )}
            </div>
        </nav >

    )
}

export default Navbar
