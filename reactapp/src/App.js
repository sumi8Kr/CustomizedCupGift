import React from 'react';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Themes from './components/admin/adminthemes';
import Homepage from './components/homepage/Homepage';
import { SuperadminProtectedRoutes, UserProtectedRoutes, AdminProtectedRoutes } from './helper/ProtectedRoutes';
import { isAuthenticatedIsUser, isAuthenticatedIsAdmin, isAuthenticatedIsSuperadmin } from './helper/Authentication';
import Dashboard from './components/superadmin/superdashboard/Dashboard';
import UpdateUser from './components/superadmin/updateuser/Updateuser';
import Notfound from './components/notfound/Notfound';

import Admindashboard from './components/admin/admindashboard/Admindashboard';
import Adminvieworders from './components/admin/adminvieworders/Adminvieworders';
import Myorder from './components/myorder/Myorder';
import { Addgift } from './components/admin/admingifts/addgift/Addgift';
import { Editgift } from './components/admin/admingifts/editgift/Editgift';
function App() {
    return (
        <Router>
            <Routes>
                <Route
                    exact
                    path="/"
                    element={(isAuthenticatedIsAdmin() &&
                        <Navigate to="/admin/home" />) || (isAuthenticatedIsUser() && <Navigate to="/user/home" />) ||
                        (isAuthenticatedIsSuperadmin() && <Navigate to="/superAdmin/getAllUsers" />) ||
                        <Navigate to="/login" />}
                />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                
                <Route element={<SuperadminProtectedRoutes />}>
                    <Route path='/superAdmin/getAllUsers' element={<Dashboard />} />
                    <Route path='/superAdmin/editUser/:userId' element={<UpdateUser />} />
                </Route>

                <Route element={<AdminProtectedRoutes />}>
                    {/* put the admin related  routes here */}
                    <Route path="/admin/gift" exact element={<Addgift/>}></Route>
                    <Route exact path="/admin/editgift/:id" element={<Editgift/>}></Route>
                    <Route path="/admin/theme" exact element={<Themes />}></Route>
                    <Route path='/admin/home' element={<Admindashboard />} />
                    <Route path='/admin/getAllOrders' element={<Adminvieworders/>}></Route>

                </Route>

                <Route element={<UserProtectedRoutes />}>
                    {/* put the user related routes here */}
                    <Route path='/user/home' element={<Homepage />} />
                    <Route path='/user/myorder' element={<Myorder/>} />
                    
                </Route>
                <Route path="*" element={<Notfound />}></Route>
            </Routes>
        </Router>

    );
    
}

export default App;
