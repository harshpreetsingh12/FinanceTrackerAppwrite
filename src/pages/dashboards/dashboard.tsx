import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reduxStore/store';
import authService from '../../services/AuthHooks';
import { removeUser, storeUser } from '../../reduxStore/authSlice';
import { isLoggedIn } from '../../helpers/helper';
import { addExpense } from '../api/routesService';
import clientPromise from '../lib/mongo';
import { CONF } from '../../conf/conf';
import { GetServerSideProps } from 'next';

interface Expense {
  _id: string; // MongoDB ID
  amount: number;
  recurrence: string;
  payFor: string;
}

interface DashboardProps {
  expenses: Expense[]; // Receive expenses as prop
}
interface AuthState {
    user: any;
    isAuthenticated: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ expenses }) => {
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
    <div>
      <h1>User Expenses</h1>
      <ul>
        {expenses.map(expense => (
          <li key={expense._id}>
            User: {expense.userId}
          </li>
        ))}
      </ul>
    </div>

    </Fragment>
  );
};

export default Dashboard;
