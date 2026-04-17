import { useState } from 'react';
import * as React from 'react';
import { LoginMutation } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectLoginError } from './UsersSlice.ts';
import { Link, useNavigate } from 'react-router-dom';
import { googleLogin, login } from './usersThunk.ts';
import { GoogleLogin } from '@react-oauth/google';


const initialState = {
  email: '',
  password: '',
};

const LoginPage = () => {
  const [form, setForm] = useState<LoginMutation>({...initialState});
  const dispatch = useAppDispatch();
  const loginError = useAppSelector(selectLoginError);
  const navigate = useNavigate();

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setForm(prev => ({...prev, [name]: value}));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await dispatch(login(form)).unwrap();

    navigate('/');
    setForm(initialState);
  };

  const googleLoginHandler = async (credential: string) => {
    await dispatch(googleLogin(credential)).unwrap();
    navigate('/');
  };

  return (
    <>
      <div className="mx-auto max-w-md rounded-2xl border border-white/70 bg-white/95 p-6 shadow-xl shadow-slate-200/80">
        <form onSubmit={onSubmit} className="flex flex-col items-center">
          <h3 className="mb-6 text-center text-2xl font-semibold text-slate-800">Sign In</h3>

          <div className="mb-4 w-full flex justify-center">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                if (credentialResponse.credential) {
                  void googleLoginHandler(credentialResponse.credential);
                }
              }}
              onError={() => alert('Login failed')}
            />
          </div>

          {loginError && (
            <div className="mb-3 w-full rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-red-700">
              {loginError.error}
            </div>
          )}

          <div className="mb-4 w-full">
            <label htmlFor="email" className="mb-1 block font-medium text-slate-700">Email</label>
            <input
              id="email"
              name="email"
              value={form.email}
              onChange={inputChange}
              type="text"
              className="w-full rounded-lg border border-slate-200 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
              placeholder="Enter email"
            />
          </div>

          <div className="mb-4 w-full">
            <label htmlFor="password" className="mb-1 block font-medium text-slate-700">Password</label>
            <input
              id="password"
              name="password"
              value={form.password}
              onChange={inputChange}
              type="password"
              className="w-full rounded-lg border border-slate-200 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
              placeholder="Enter Password"
            />
          </div>

          <button type="submit"
                  className="w-full rounded-lg bg-rose-500 px-4 py-2 font-bold text-white transition hover:bg-rose-600">
            Submit
          </button>

          <p className="text-center mt-3">
            <Link to="/register" className="font-medium text-rose-500 hover:underline">Don't have an account? Sign up</Link>
          </p>
        </form>
      </div>

    </>

  );
};

export default LoginPage;