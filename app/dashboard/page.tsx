import Link from 'next/link'

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
      <p className="mb-6 text-gray-600">Welcome to the AJB Poultry Farm management system. Select a category to manage:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/dashboard/expenses" className="p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50 transition-colors">
          <h2 className="text-xl font-semibold mb-2">Expenses</h2>
          <p className="text-gray-600">Manage and track farm expenses</p>
        </Link>
        <Link href="/dashboard/incomes" className="p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50 transition-colors">
          <h2 className="text-xl font-semibold mb-2">Incomes</h2>
          <p className="text-gray-600">Record and monitor farm income</p>
        </Link>
        <Link href="/dashboard/mortality" className="p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50 transition-colors">
          <h2 className="text-xl font-semibold mb-2">Mortality</h2>
          <p className="text-gray-600">Track bird mortality rates</p>
        </Link>
        <Link href="/dashboard/batches" className="p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50 transition-colors">
          <h2 className="text-xl font-semibold mb-2">Batches</h2>
          <p className="text-gray-600">Manage poultry batches</p>
        </Link>
      </div>
    </div>
  )
}

