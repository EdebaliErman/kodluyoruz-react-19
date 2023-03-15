import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import './reset.css';
import ProtectedRoute from './pages/ProtectedRoute';
import Singnin from './pages/Auth/Signin';
import Navbar from './components/Navbar';
import Signup from './pages/Auth/Signup';
import Products from './pages/Products';
import Basket from './pages/Basket';
import Profile from './pages/Profile';
import ProductsDetail from './pages/ProductsDetail';
import Error404 from './pages/Error404';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <Navbar />
      <div id='content'>
        <Routes>
          <Route path='/' index element={<Products />} />
          <Route path='/product/:product_id' element={<ProductsDetail />} />
          <Route path='/signin' element={<Singnin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/basket' element={<Basket />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin/*" admin={true} element={<Admin />} />
          </Route>
          <Route path='*' element={<Error404 />} />

        </Routes>

      </div>
    </Router>
  );

}

export default App;
