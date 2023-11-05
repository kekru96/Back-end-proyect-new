import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../utils/axios'

export const RecoverPassword = () => {
  const navigate = useNavigate('/')
  const [userEmail, setUserEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/users/recoverpassword', userEmail)
      .then(res => {
        if (response.status === 200) {
          // Navigate to the login page on success
          window.location.href = '/login';
        } else {
          // Navigate to the error page on failure
          window.location.href = '/errorrecoverpassword';
        }
      })
      .catch(error => (
        navigate('/errorrecoverpassword')
      ))
  }

  return (
    <main className='min-h-screen w-full h-full flex justify-center items-center flex-col gap-3'>
        <div className='text-center'>
            <p>Please provide the email associated with the account you want to recover the password for.</p>
            <p>Make sure you have access to this email.</p>
        </div>
        <form action="http://localhost:9090/api/users/recoverpassword" method="POST" className='flex flex-col items-center justify-center gap-2'>
            <input type="email" placeholder='Email' className='input input-bordered w-full max-w-xs' id="email" name="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
            <input type="submit" value="Send" className="btn text-myDarkColor" />
        </form>
        <Link className="text-blue-700 font-medium cursor-pointer hover:underline" to="/login">If you don't wish to recover your password, proceed to the login page</Link>
    </main>
  )
}
