export const CONF={
    APPWRITE_ENDPOINT:String(process.env.NEXT_PUBLIC_API_ENDPOINT),
    APPWRITE_PROJECT_ID:String(process.env.NEXT_PUBLIC_PROJECT_ID),

}

export const publicPaths=[
    '/', '/auth/singin','/auth/signup'
]