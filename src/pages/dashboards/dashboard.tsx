import { useRouter } from 'next/router';
import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reduxStore/store';
import authService from '../../services/AuthHooks';
import { removeUser} from '../../reduxStore/authSlice';
import { addExpense } from '../api/routesService';

interface DashboardProps {
  
}
interface AuthState {
    user: any;
    isAuthenticated: boolean;
}

const Dashboard: React.FC<DashboardProps> = () => {
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
    <Fragment>

    <div className="max-w-md mx-auto p-4 pt-6 pb-4 mt-4 mb-4 bg-white rounded shadow-md">
      <h1 className="text-3xl font-bold mb-4">Hello {user.name}</h1>
    <button onClick={addExpense}>Add Value</button><br/>
    <button onClick={logOutcall}>Logout</button>
    </div>
    </Fragment>
  );
};

export default Dashboard;
