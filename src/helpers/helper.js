export function isLoggedIn() {
  console.log('loginrun')
    if (typeof window !== 'undefined') {
      const session=JSON.parse(localStorage.getItem('cookieFallback'))

      if (Array.isArray(session)) {
        return session.length !== 0; 
      } else if (session && typeof session === 'object') {
        return Object.keys(session).length !== 0; 
      }
      return false;


    }
    return false;
  }