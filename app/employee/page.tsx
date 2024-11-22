'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function EmployeePage() {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex flex-col">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex-shrink-0 flex items-center">
            <Image
              className="mx-auto h-20 w-auto"
              src="/logo.png"
              alt="AJB Poultry Farm"
              width={40}
              height={40}
              priority
              style={{ height: "auto", width: "auto" }}
            />
            <h1 className="text-3xl font-bold text-gray-900">
              {" "}
              Employee Dashboard
            </h1>
          </div>          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
          <div>
            <Image
              className="mx-auto h-20 w-auto"
              src="/logo.png"
              alt="AJB Poultry Farm"
              width={80}
              height={80}
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Welcome, Employee
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              This is your employee dashboard. You can manage your tasks from here.
            </p>
          </div>
          <div className="mt-8 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                View Tasks
              </button>
              <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Submit Reports
              </button>
              <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                View Schedule
              </button>
              <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Request Time Off
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

