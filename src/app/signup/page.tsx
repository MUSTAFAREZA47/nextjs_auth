'use client'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-hot-toast'

export default function SignupPage() {
    const router = useRouter()
    const [user, setUser] = React.useState({
        email: '',
        password: '',
        username: '',
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(true)
    const [loading, setLoading] = React.useState(false)

    const onSignup = async () => {
        try {
            setLoading(true)
            const response = await axios.post('/api/users/signup', user)
            console.log('Signup success', response.data)
            toast.success('Signup successful! Redirecting to login...')
            router.push('/login')
        } catch (error: any) {
            console.log('Signup failed', error.message)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const isValid =
            user.email.trim().length > 0 &&
            user.password.trim().length > 0 &&
            user.username.trim().length > 0
        setButtonDisabled(!isValid)
    }, [user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-10">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
                <h1 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
                    {loading ? 'Processing...' : 'Signup'}
                </h1>
                <hr className="mb-6" />
                <div className="space-y-4">
                    <label htmlFor="username" className="block text-gray-600">
                        Username
                    </label>
                    <input
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
                        id="username"
                        type="text"
                        value={user.username}
                        onChange={(e) =>
                            setUser({ ...user, username: e.target.value })
                        }
                        placeholder="Enter your username"
                    />
                    <label htmlFor="email" className="block text-gray-600">
                        Email
                    </label>
                    <input
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
                        id="email"
                        type="email"
                        value={user.email}
                        onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                        }
                        placeholder="Enter your email"
                    />
                    <label htmlFor="password" className="block text-gray-600">
                        Password
                    </label>
                    <input
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
                        id="password"
                        type="password"
                        value={user.password}
                        onChange={(e) =>
                            setUser({ ...user, password: e.target.value })
                        }
                        placeholder="Enter your password"
                    />
                </div>
                <button
                    onClick={onSignup}
                    className={`w-full p-3 mt-6 text-white font-semibold rounded-lg transition duration-300 ${
                        buttonDisabled
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-indigo-600 hover:bg-indigo-700'
                    }`}
                    disabled={buttonDisabled}
                >
                    {loading ? 'Signing up...' : 'Signup'}
                </button>
                <p className="text-sm text-center text-gray-500 mt-4">
                    Already have an account?{' '}
                    <Link href="/login">
                        <span className="text-indigo-600 hover:underline cursor-pointer">
                            Login
                        </span>
                    </Link>
                </p>
            </div>
        </div>
    )
}
