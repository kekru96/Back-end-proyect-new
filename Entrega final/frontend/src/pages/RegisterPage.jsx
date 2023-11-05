import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import { Toaster, toast } from 'sonner';

export const Register = () => {
    const { signup, isAuthenticated } = useAuth()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [date, setDate] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if(isAuthenticated) navigate('/')
    }, [isAuthenticated])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const user = {
                first_name: firstName,
                last_name: lastName,
                date_of_birth: date,
                email,
                password
            }
            const res = await signup(user)
            if(res.data.payload === 'A user already exists with that email'){
                toast('That email is already registered',{
                    action: {
                        label: 'Go to log in',
                        onClick: () => navigate('/login')
                    }
                })
            }
            navigate('/login')
        }catch(error){
            toast.error('Error trying to register, check that all fields are completed')
        }
    }

    return (
        <main className='min-h-screen w-full h-full flex justify-center lg:grid lg:grid-cols-2'>
            <div className='flex flex-col items-center justify-center gap-5'>
            <Toaster position="top-left" richColors/>
                <h1 className='font-bold text-6xl uppercase tracking-wide text-myDarkColor'>Register</h1>
                <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-2'>
                    <input
                        type="text"
                        placeholder='First name'
                        className='input input-bordered w-full max-w-xs'
                        id="first_name"
                        name="first_name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder='Last name'
                        className='input input-bordered w-full max-w-xs'
                        id="last_name"
                        name="last_name" 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <input
                        type="date"
                        placeholder='Date of birth'
                        className='input input-bordered w-full max-w-xs'
                        id="date_of_birth"
                        name="date_of_birth"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
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
                    <input type="submit" value="Register" className="btn text-myDarkColor" />
                </form>
                <div className='flex flex-col items-center text-sm'>
                    <Link className="text-blue-700 font-medium cursor-pointer hover:underline" to="/login">Already have an account? Log in here</Link>
                </div>
            </div>
            <div className='hidden lg:block relative'>
                <Link to="/" className='right-0 m-5 absolute btn btn-sm btn-outline border-myLightGreen text-myLightGreen hover:bg-myLightGreen hover:text-myDarkColor hover:border-myGreen'>Go homepage</Link>
                <img className='w-full h-full' src="https://cdn.dribbble.com/userupload/5006115/file/original-94f304af5ae4767a1366284c37915bf7.gif" alt="Tech gif" />
            </div>
        </main>
    )
}
