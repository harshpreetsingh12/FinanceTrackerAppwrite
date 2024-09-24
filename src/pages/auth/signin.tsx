import Link from 'next/link';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../services/AuthHooks';
import { storeUser } from '../../reduxStore/authSlice';
import { useRouter } from 'next/router';

interface SignInProps {
  // Add props if needed
}

const SignIn: React.FC<SignInProps> = () => {
  const router= useRouter()
  const dispatch= useDispatch()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn =async (e: React.FormEvent<HTMLFormElement>) => {
    //emergency logut
    // await authService.logout()
    // return
    e.preventDefault()
    try{
      if(!email || !password){
        alert("All fields are rquired")
      }
      //Start login 
      await authService.loginUser({email, password})

      const currentUser =await authService.getUser()
      dispatch(storeUser(currentUser)); // Store user in Redux
      router.push('/dashboards');
    }
    catch(err){
      console.log(err)
    }
  };


  return (
    <div className="max-w-md mx-auto p-4 pt-6 pb-4 mt-4 mb-4 bg-white rounded shadow-md">
      <h1 className="text-3xl font-bold mb-4">Sign In</h1>
      <form>
        <label className="block mb-2">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 pl-10 text-sm text-gray-700"
          />
        </label>
        <label className="block mb-2">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 pl-10 text-sm text-gray-700"
          />
        </label>
        <Link href={"/auth/signup"}>
        <p className='text-orange-500'>Need a new Account?</p>
        </Link>
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSignIn}
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;