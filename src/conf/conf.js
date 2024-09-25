export const CONF={
    APPWRITE_ENDPOINT:String(process.env.NEXT_PUBLIC_API_ENDPOINT),
    APPWRITE_PROJECT_ID:String(process.env.NEXT_PUBLIC_PROJECT_ID),
    MONGO_URL:String(process.env.NEXT_PUBLIC_MONGO_URL),
    NODE_ENV:String(process.env.NEXT_PUBLIC_NODE_ENV),
    DB_NAME:String(process.env.NEXT_PUBLIC_DATABASE_NAME),
    expenseInFoCollection:"userExpensesInfo"
}

export const publicPaths=[
    '/', '/auth/singin','/auth/signup'
]