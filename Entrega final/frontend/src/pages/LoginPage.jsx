import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react';
import { Toaster, toast } from 'sonner';


export const Login = () => {
    const { login, isAuthenticated } = useAuth()
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (isAuthenticated) navigate('/')
    }, [isAuthenticated])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login({ email, password })
        } catch (error) {
            toast.error('Error trying to login, check your credentials')
        }
    };

    return (
        <main className='min-h-screen w-full h-full flex justify-center lg:grid lg:grid-cols-2'>
            <div className='hidden lg:block relative'>
                <Link to="/" className='m-5 absolute btn btn-sm btn-outline border-myLightGreen text-myLightGreen hover:bg-myLightGreen hover:text-myDarkColor hover:border-myGreen'>Go homepage</Link>
                <img className='w-full h-full' src="https://cdn.dribbble.com/userupload/5006115/file/original-94f304af5ae4767a1366284c37915bf7.gif" alt="Tech gif" />
            </div>
            <div className='flex flex-col items-center justify-center gap-5'>
                <Toaster position="top-right" richColors />
                <h1 className='font-bold text-6xl uppercase tracking-wide text-myDarkColor'>Log in</h1>
                <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-2'>
                    <input
                        type="email"
                        placeholder='Email'
                        className='input input-bordered w-full max-w-xs'
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder='Password'
                        className='input input-bordered w-full max-w-xs'
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input type="submit" value="Login" className="btn text-myDarkColor" />
                </form>
                <hr className='block w-96 h-4'></hr>
                <a className="py-2 px-4 max-w-md flex justify-center items-center bg-gray-600 w-72 transition ease-in duration-200 text-center text-base font-semibold rounded-lg hover:bg-gray-700 text-white" href="http://localhost:9090/api/users/github">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="mr-2" viewBox="0 0 1792 1792">
                        <path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z"></path>
                    </svg>
                    Log in with Github
                </a>
                <div className='flex flex-col items-center text-sm'>
                    <Link className="text-blue-700 font-medium cursor-pointer hover:underline" to="/register">Don't have an account? Create one here</Link>
                    <Link className="text-blue-700 font-medium cursor-pointer hover:underline" to="/recoverpassword">Forgot your password? Recover it here</Link>
                </div>
            </div>
        </main>
    )
}