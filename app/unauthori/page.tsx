import Link from 'next/link'

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Unauthorized Access
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          You do not have permission to access this page.
        </p>
        <div className="mt-8 text-center">
          <Link href="/dashboard" className="text-indigo-600 hover:text-indigo-500">
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}

