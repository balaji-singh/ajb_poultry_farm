import Link from 'next/link'

export default function EmployeeIncomesPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Incomes (Employee View)</h1>
        <Link href="/employee" className="text-blue-500 hover:underline">Back to Dashboard</Link>
        {/* Add employee incomes content here */}
      </div>
    </div>
  )
}

