import Link from 'next/link'

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/dashboard/expenses" className="p-4 bg-white shadow rounded-lg hover:shadow-md transition-shadow">
          Expenses
        </Link>
        <Link href="/dashboard/incomes" className="p-4 bg-white shadow rounded-lg hover:shadow-md transition-shadow">
          Incomes
        </Link>
        <Link href="/dashboard/mortality" className="p-4 bg-white shadow rounded-lg hover:shadow-md transition-shadow">
          Mortality
        </Link>
        <Link href="/dashboard/batches" className="p-4 bg-white shadow rounded-lg hover:shadow-md transition-shadow">
          Batches
        </Link>
      </div>
    </div>
  )
}

