'use client'
import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState('nothing')

    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout successful')
            router.push('/login')
        } catch (error: any) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data)
        setData(res.data.data._id)
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-10">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 text-center">
                <h1 className="text-3xl font-semibold text-gray-700 mb-4">
                    Profile
                </h1>
                <hr className="mb-6" />
                <p className="text-xl text-gray-600 mb-4">Profile Page</p>

                <h2 className="p-3 text-xl font-medium text-white bg-green-500 rounded-md">
                    {data === 'nothing' ? (
                        'Nothing'
                    ) : (
                        <Link
                            href={`/profile/${data}`}
                            className="text-black hover:text-white"
                        >
                            {data}
                        </Link>
                    )}
                </h2>

                <hr className="my-6" />

                <div className="flex justify-center space-x-4">
                    <button
                        onClick={logout}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                    >
                        Logout
                    </button>

                    <button
                        onClick={getUserDetails}
                        className="bg-green-800 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                    >
                        Get User Details
                    </button>
                </div>
            </div>
        </div>
    )
}
