import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const UpdatePassword = () => {
  const searchParams = new URLSearchParams(location.search)
  const [token, setToken] = useState('')

  useEffect(() => {
    const tokenFromQueryParam = searchParams.get('token');
    if (tokenFromQueryParam !== null) {
      setToken(tokenFromQueryParam);
    }
  }, []);

  return (
    <main className='min-h-screen w-full h-full flex justify-center items-center flex-col gap-3'>
        <div className='text-center'>
            <p>Please provide your new password.</p>
        </div>
        <form action="http://localhost:9090/api/users/updatepassword" method="POST" className='flex flex-col items-center justify-center gap-2'>
            <input type="password" placeholder='Password' className='input input-bordered w-full max-w-xs' id="password" name="password" />
            <input type="hidden" name="token" id="token" value={token} />
            <input type="submit" value="Send" className="btn text-myDarkColor" />
        </form>
    </main>
  )
}
