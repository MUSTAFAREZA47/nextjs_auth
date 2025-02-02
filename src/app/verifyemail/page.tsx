'use client'

import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function VerifyEmailPage() {
    const [token, setToken] = useState('')
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyemail', { token })
            setVerified(true)
        } catch (error: any) {
            setError(true)
            console.log(error.response.data)
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split('=')[1]
        setToken(urlToken || '')
    }, [])

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail()
        }
    }, [token])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-10">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-4xl font-semibold text-gray-700 text-center mb-6">
                    Verify Email
                </h1>

                <h2 className="text-xl font-medium text-center text-gray-600 mb-4">
                    {token ? (
                        <span className="inline-block p-2 bg-orange-500 text-black rounded-lg">
                            Token: {token}
                        </span>
                    ) : (
                        <span className="text-red-500">No token found</span>
                    )}
                </h2>

                {verified && (
                    <div className="text-center mt-6">
                        <h2 className="text-2xl font-semibold text-green-600 mb-4">
                            Email Verified Successfully!
                        </h2>
                        <Link
                            href="/login"
                            className="text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded-lg transition duration-300"
                        >
                            Login Now
                        </Link>
                    </div>
                )}

                {error && (
                    <div className="text-center mt-6">
                        <h2 className="text-2xl font-semibold text-red-600 mb-4">
                            Error Verifying Email
                        </h2>
                        <p className="text-gray-600">
                            Something went wrong, please try again later.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
