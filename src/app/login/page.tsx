'use client'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-hot-toast'

export default function LoginPage() {
    const router = useRouter()
    const [user, setUser] = React.useState({
        email: '',
        password: '',
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(true)
    const [loading, setLoading] = React.useState(false)

    const onLogin = async () => {
        try {
            setLoading(true)
            const response = await axios.post('/api/users/login', user)
            console.log('Login success', response.data)
            toast.success('Login successful')
            router.push('/profile')
        } catch (error: any) {
            console.log('Login failed', error.message)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setButtonDisabled(!(user.email.trim() && user.password.trim()))
    }, [user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-10">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
                <h1 className="text-3xl font-semibold text-gray-700 mb-6 text-center">
                    {loading ? 'Processing...' : 'Login'}
                </h1>
                <hr className="mb-6" />

                <div className="space-y-4">
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
                    onClick={onLogin}
                    className={`w-full p-3 mt-6 text-white font-semibold rounded-lg transition duration-300 ${
                        buttonDisabled
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-indigo-600 hover:bg-indigo-700'
                    }`}
                    disabled={buttonDisabled}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>

                <p className="text-sm text-center text-gray-500 mt-4">
                    Don’t have an account?{' '}
                    <Link href="/signup">
                        <span className="text-indigo-600 hover:underline cursor-pointer">
                            Sign up
                        </span>
                    </Link>
                </p>
            </div>
        </div>
    )
}
