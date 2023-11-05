import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Spinner } from '../components/Spinner'
import { Toaster, toast } from 'sonner'
import axios from '../utils/axios'

export const Account = () => {
    const { user, isAuthenticated } = useAuth()
    const [documents, setDocuments] = useState([]);
    const [documentsLoaded, setDocumentsLoaded] = useState(false); 

    useEffect(() => {
        if (user && user.documents) {
            setDocuments(user.documents);
            setDocumentsLoaded(true);
        }
    }, [user])

    if (user === null) return <Spinner />

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const apiUrl = `http://localhost:9090/api/users/${user._id}/documents`

            const formData = new FormData();
            formData.append('profile', e.target.profile.files[0]);
            formData.append('identification', e.target.identification.files[0]);
            formData.append('addressProof', e.target.addressProof.files[0]);
            formData.append('accountStatement', e.target.accountStatement.files[0]);

            const res = axios.post(apiUrl, formData)
                .then(result => {
                    toast.success('Files uploaded successfully!')
                })
            } catch (error) {
                toast.error('Error trying to upload files')
        }
    }


    return (
        <div className='container mx-auto px-8 mt-2 min-h-screen'>
            <Toaster position="top-right" richColors closeButton />
            <p className='text-4xl font-bold text-myDarkColor mb-5'>My account</p>
            <div className='grid grid-cols-1 md:grid-cols-2'>
                <div>
                    <p>Name: {user.first_name} {user.last_name}</p>
                    <p>Birthdate: {user.date_of_birth}</p>
                    <p>Email: {user.email}</p>
                    <p>Role: {user.role}</p>
                </div>
                <div>
                    {user.documents && user.documents.length > 0 ? (
                        user.documents.map(doc => {
                            if (doc.name === 'profile') {
                                return <img key={doc._id} src={doc.reference} alt='Profile image' />; // TOFIX: Not allowed to load local resource
                            }
                            return null;
                        })
                    ) : (
                        <p>Profile image</p>
                    )}
                </div>
            </div>
            <hr className='my-4' />
            <form onSubmit={handleSubmit} className='flex flex-col gap-5' encType="multipart/form-data">
                <fieldset className='flex flex-col'>
                    <label htmlFor="profile">Upload your profile image:</label>
                    <input type="file" name="profile" disabled={documentsLoaded && documents.some(doc => doc.name === 'profile')} />
                </fieldset>

                <fieldset className='flex flex-col'>
                    <label htmlFor="identification">Upload your identification:</label>
                    <input type="file" name="identification" disabled={documentsLoaded && documents.some(doc => doc.name === 'identification')} />
                </fieldset>

                <fieldset className='flex flex-col'>
                    <label htmlFor="addressProof">Upload your address proof:</label>
                    <input type="file" name="addressProof" disabled={documentsLoaded && documents.some(doc => doc.name === 'addressProof')} />
                </fieldset>

                <fieldset className='flex flex-col'>
                    <label htmlFor="accountStatement">Upload your account statement:</label>
                    <input type="file" name="accountStatement" disabled={documentsLoaded && documents.some(doc => doc.name === 'accountStatement')} />
                </fieldset>
                <p className='text-center text-sm'>To see the changes after uploading the files you have to log out and log back in</p>
                <input type="submit" value="Upload" className='btn' />
            </form>
        </div>
    )
}
