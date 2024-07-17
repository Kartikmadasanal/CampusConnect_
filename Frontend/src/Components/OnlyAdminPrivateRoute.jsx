import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { UserContextProvider } from '../context/UserContext'

export default function OnlyAdminPrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser.isAdmin ?
      (
        <UserContextProvider>

      <Outlet />
    </UserContextProvider>
      ) : (
      <Navigate to='/login' />
      );
}

