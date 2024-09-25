
export const addExpense = async () => {
    const expenseData = { //dummy
      userId: '12345',
      userIncomes: [{ amount: 5000, from: 'Freelance' }],
      expenseCategory: ['Rent', 'Food'],
      userExpenses: [{ amount: 300, recurrence: 'month', payFor: 'food' }],
      lastMonthSaving: [{ moneySaved: 200, totalExpense: 1000, storedAt: Date.now(), forMonth: 'June' }]
    };
  
    const response = await fetch('/api/addExpenceInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expenseData),
    });
  
    const result = await response.json();
    console.log(result);
  };
  