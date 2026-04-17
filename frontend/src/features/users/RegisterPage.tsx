import { useState } from 'react';
import * as React from 'react';
import { RegisterMutation } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectRegisterError } from './UsersSlice.ts';
import { Link, useNavigate } from 'react-router-dom';
import { register } from './usersThunk.ts';
import FileInput from '../../components/FileInput/FileInput.tsx';

const regEmail = /^(\w+[-.]?\w+)@(\w+)([.-]?\w+)?(\.[a-zA-Z]{2,3})$/;

const initialState = {
  email: '',
  password: '',
  image: '',
  displayName: ''
};

const RegisterPage = () => {
  const [form, setForm] = useState<RegisterMutation>({...initialState});
  const [errors, setErrors] = useState<{ email?: string }>({});
  const dispatch = useAppDispatch();
  const registerError = useAppSelector(selectRegisterError);
  const navigate = useNavigate();

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setForm(prev => ({...prev, [name]: value}));

    if (name === 'email') {
      if (regEmail.test(value)) {
        setErrors(prev => ({...prev, email: ''}));
      } else {
        setErrors(prev => ({...prev, email: 'Invalid email format'}));
      }
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(form);
    try {
      await dispatch(register(form)).unwrap();
      navigate('/');

      setForm(initialState);
    } catch (e) {
      console.log(e);
    }
  };

  const getFiledError = (fieldName: string) => {
    try {
      return registerError?.errors?.[fieldName]?.message || '';
    } catch (e) {
      return e;
    }
  };

  const getImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;

    if (files) {
      setForm(prevState => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };

  return (
    <>
      <div className="mx-auto max-w-md rounded-2xl border border-white/70 bg-white/95 p-6 shadow-xl shadow-slate-200/80">
        <form onSubmit={onSubmit}>
          <h3 className="mb-5 text-center text-2xl font-semibold text-slate-800">Sign Up</h3>

          <div className="mb-4">
            <label htmlFor="email" className="mb-1 block font-medium text-slate-700">Email</label>
            <input
              id="email"
              name="email"
              value={form.email}
              onChange={inputChange}
              type="text"
              className={`w-full rounded-lg border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-300 ${
                getFiledError('email') || errors.email ? 'border-red-500' : 'border-slate-200'
              }`}
              placeholder="Enter email"
            />
            {getFiledError('email') && (
              <p className="text-red-500 text-sm mt-1">{getFiledError('email') || errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="mb-1 block font-medium text-slate-700">Password</label>
            <input
              id="password"
              name="password"
              value={form.password}
              onChange={inputChange}
              type="password"
              className={`w-full rounded-lg border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-300 ${
                getFiledError('password') ? 'border-red-500' : 'border-slate-200'
              }`}
              placeholder="Enter Password"
            />
            {getFiledError('password') && (
              <p className="text-red-500 text-sm mt-1">{getFiledError('password')}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="displayName" className="mb-1 block font-medium text-slate-700">Display Name</label>
            <input
              id="displayName"
              name="displayName"
              value={form.displayName}
              onChange={inputChange}
              type="text"
              className="w-full rounded-lg border border-slate-200 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
              placeholder="Enter Display Name"
            />
          </div>

          <div className="mb-4">
            <FileInput name="image" label="Image" onGetFile={getImage}/>
          </div>

          <button type="submit"
                  className="w-full rounded-lg bg-rose-500 px-4 py-2 font-bold text-white transition hover:bg-rose-600">
            Submit
          </button>

          <p className="text-center mt-3">
            <Link to="/login" className="font-medium text-rose-500 hover:underline">Already have an account? Sign in</Link>
          </p>
        </form>
      </div>

    </>
  );
};

export default RegisterPage;