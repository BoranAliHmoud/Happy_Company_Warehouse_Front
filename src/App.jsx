import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom'
import Layout from './components/shared/Layout'
import Login from './pages/Login'
  import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Warehouse from './pages/Warehouse'
import WarehouseForm from './pages/WarehouseForm'
import { useState, useEffect } from 'react';
 

import Users from './pages/Users'
import UsersForm from './pages/UsersForm'

import Items from './pages/Items'
import ItemsForm from './pages/ItemsForm'
 
function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const authStatus = localStorage.getItem('isAuthenticated');
        setIsAuthenticated(authStatus === "true");
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={isAuthenticated ? <Layout /> : <Navigate to="/login" />} />
                <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                
                {isAuthenticated && (
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="Warehouse" element={<Warehouse />} />
                        <Route path="products" element={<Products />} />
                        <Route path="edit/:id?" element={<WarehouseForm />} />
                        <Route path="Users" element={<Users />} />
                        <Route path="editUser/:id?" element={<UsersForm />} />
                        <Route path="Items/:id?" element={<Items />} />
                        <Route path="editItems/:id?" element={<ItemsForm />} />
                    </Route>
                )}
            </Routes>
        </Router>
    );
}

export default App
