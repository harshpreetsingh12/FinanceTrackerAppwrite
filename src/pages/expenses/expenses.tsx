import React from 'react';

interface ExpenseProps {
  expenses: Expense[]; // Receive expenses as prop
}
interface Expense {
  _id: string; // MongoDB ID
  amount: number;
  recurrence: string;
  payFor: string;
  userId: string;
}

const Expenses: React.FC<ExpenseProps> = ({ expenses }) => {
  return (
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

);
};

export default Expenses;
