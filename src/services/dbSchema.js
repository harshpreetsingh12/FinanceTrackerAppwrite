const userExpensesInfo={
    userId,
    userIncoms:[
        {
            amount:0,
            from:'Freelance'// job etc
        }
    ],
    expenseCategory:['Rent','Food'], // we can have some defaut categoyr
    userExpenses:[
        {
            amount:0,
            recurrence:'', // year, month, week
            payFor:'food' //from the category
        }
    ],
    lastMonthSaving:[ //this will be populated by the app
        {
            moneySaved:0,
            totalExpence:0,
            storedAt:0,
            forMonth:"June"
        }
    ]
}

const userTable={
    user_id:'',
    username:'',
    email:'',
    userStats:false
}