import React from 'react';
import Dashboard from './dashboard';
import clientPromise from '../lib/mongo';
import { GetServerSideProps } from 'next';
import { CONF } from '../../conf/conf';

interface Expense {
  _id: string;
  amount: number;
  recurrence: string;
  payFor: string;
}

interface ExpensesPageProps {
  expenses: Expense[];
}

export const getServerSideProps: GetServerSideProps<ExpensesPageProps> = async () => {
  try {
    const client = await clientPromise;
    console.log('Connected to MongoDB');
    const db = client.db(CONF.DB_NAME);

    const expenses = await db.collection(CONF.expenseInFoCollection).find({}).toArray();
    console.log('Fetched expenses:', expenses);

    return {
      props: {
        expenses: JSON.parse(JSON.stringify(expenses)),
      },
    };
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return {
      props: {
        expenses: [],
      },
    };
  }
};

const DashBoardStart: React.FC<ExpensesPageProps> = ({ expenses }) => {
  return <Dashboard expenses={expenses} />;
};

export default DashBoardStart;
