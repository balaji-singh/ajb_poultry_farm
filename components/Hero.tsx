'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Navbar from './Navbar'

export default function Hero() {
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, password }),
      })

      const data = await response.json()

      if (response.ok) {
        // Redirect based on user type
        if (data.userType === 'admin') {
          router.push('/admin')
        } else if (data.userType === 'employee') {
          router.push('/employee')
        } else {
          router.push('/dashboard')
        }
      } else {
        setError(data.error || 'Login failed')
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    }
  }

  return (
    <div className="relative bg-white overflow-hidden">
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32 min-h-screen flex items-center">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Login to</span>{' '}
                <span className="block text-indigo-600 xl:inline">AJB Poultry Farm</span>
              </h1>
              <div className="mt-5 sm:mt-8 flex justify-center">
                <div className="mt-3 sm:mt-0 w-full max-w-xs">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="userId" className="sr-only">
                        User ID
                      </label>
                      <input
                        id="userId"
                        name="userId"
                        type="text"
                        autoComplete="username"
                        required
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="User ID"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="password" className="sr-only">
                        Password
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    {error && (
                      <div className="text-red-600 text-sm">{error}</div>
                    )}
                    <div>
                      <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Sign in
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

