import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticatedIsAdmin, isAuthenticatedIsSuperadmin, isAuthenticatedIsUser } from './Authentication';

export function AdminProtectedRoutes() {
    return isAuthenticatedIsAdmin() ? <Outlet /> : <Navigate to="/login" />
    
}

export function SuperadminProtectedRoutes() {
    return isAuthenticatedIsSuperadmin() ? <Outlet /> : <Navigate to="/login" />
    
}

export function UserProtectedRoutes() {
    return  isAuthenticatedIsUser() ? <Outlet /> : <Navigate to="/login" />
}
