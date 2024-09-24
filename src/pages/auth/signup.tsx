import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { isLoggedIn } from '../../helpers/helper';
import { storeUser } from '../../reduxStore/authSlice';
import { useDispatch } from 'react-redux';
import authService from '../../services/AuthHooks';

interface SignUpProps {
  // Add props if needed
}

const SignUp: React.FC<SignUpProps> = () => {
  const router = useRouter();
  const dispatch = useDispatch()

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function StartSignupProcess(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    if(!name || !email || !password){
      alert("All fields are rquired")
    }

    await authService.createAccount({name,email,password})
    const currentUser =await authService.getUser()
    dispatch(storeUser(currentUser)); // Store user in Redux

  }

  return (
    <div className="max-w-md mx-auto p-4 pt-6 pb-4 mt-4 mb-4 bg-white rounded shadow-md">
      <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
      <form>
        <label className="block mb-2">
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 pl-5 text-sm text-gray-700"
          />
        </label>
        <label className="block mb-2">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 pl-5 text-sm text-gray-700"
          />
        </label>
        <label className="block mb-2">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 pl-5 text-sm text-gray-700"
          />
        </label>
        <Link href={"/"}>
        <p className='text-orange-500'>Need a new Account?</p>
        </Link>
        <button
          type="submit"
          onClick={StartSignupProcess}
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;