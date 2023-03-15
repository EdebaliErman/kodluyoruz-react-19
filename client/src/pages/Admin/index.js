import React from 'react'
import './style.css'
import { NavLink, Route, Routes } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import Home from './Home'
import Products from './Products'
import Orders from './Orders'
import ProductDetail from './ProductDetail'
import NewProduct from './Products/newProduct'

function Admin() {
    return (
        <div>
            <nav>
                <ul className='admin-menu'>
                    <li>
                        <NavLink to="/admin">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/orders">Orders</NavLink>
                    </li>                    <li>
                        <NavLink to="/admin/products">Products</NavLink>
                    </li>
                </ul>
            </nav>
            <Box mt={10}>
                <Routes>
                    <Route path="/" index element={<Home />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/new" element={<NewProduct />} />
                    <Route path="/products/:product_id"  element={<ProductDetail />} />
                </Routes>

            </Box>
        </div>
    )
}

export default Admin
