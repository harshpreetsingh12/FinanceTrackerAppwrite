import type { AppProps } from 'next/app';
import '../styles/globals.css'; // Import global styles
import { RootState, store } from '../reduxStore/store';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { isLoggedIn } from '../helpers/helper';
import authService from '../services/AuthHooks';
import { storeUser } from '../reduxStore/authSlice';
import { publicPaths } from '../conf/conf';

function ProtectedRoute({ Component, pageProps }: any) {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    if(isLoggedIn() && !isAuthenticated){
        getUser()
        return
    }

    if (isAuthenticated && publicPaths.includes(window.location.pathname)) {
      router.push('/dashboards')
    }

  }, [isAuthenticated, router]);

  const getUser=async ()=>{
    const currentUser =await authService.getUser()
    dispatch(storeUser(currentUser));
    router.push('/dashboards')
  }

  return <Component {...pageProps} />;
}

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ProtectedRoute Component={Component} pageProps={pageProps} />
    </Provider>
  )
}

export default App;
