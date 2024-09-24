import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reduxStore/store';
import authService from '../../services/AuthHooks';
import { removeUser, storeUser } from '../../reduxStore/authSlice';
import { isLoggedIn } from '../../helpers/helper';

interface dashBoardProps {
    // Add props if needed
}

interface AuthState {
    user: any;
    isAuthenticated: boolean;
}

const Dashboard: React.FC<dashBoardProps> = () => {
  const router = useRouter();
  const dispatch=useDispatch()
  const {isAuthenticated, user}:AuthState = useSelector((state: RootState) => state.auth);

  const logOutcall=async ()=>{
    await authService.logout()
    dispatch(removeUser())
    router.push('/auth/signin')
  }
  
  if(!isAuthenticated){ return <div> Loading</div>}
  return (
    <div className="max-w-md mx-auto p-4 pt-6 pb-4 mt-4 mb-4 bg-white rounded shadow-md">
      <h1 className="text-3xl font-bold mb-4">Hello {user.name}</h1>
    <button onClick={logOutcall}>Logout</button>
    </div>
  );
};

export default Dashboard;