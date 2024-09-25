import { CONF } from '../../conf/conf';
import clientPromise from '../lib/mongo';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const client = await clientPromise;
      const db = client.db(CONF.DB_NAME);

      const { userId, userIncomes, expenseCategory, userExpenses, lastMonthSaving } = req.body;

      const newExpense = {
        userId,
        userIncomes,
        expenseCategory,
        userExpenses,
        lastMonthSaving
      };

      const result = await db.collection(CONF.expenseInFoCollection).insertOne(newExpense);

      res.status(201).json({ success: true, data: result });
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Database error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
