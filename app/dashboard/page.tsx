import Link from 'next/link'
import { DollarSign, TrendingUp, Users, Activity } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Revenue', value: '$24,567', icon: DollarSign, trend: '+12.5%' },
          { label: 'Total Expenses', value: '$12,345', icon: TrendingUp, trend: '-2.5%' },
          { label: 'Active Batches', value: '23', icon: Users, trend: '+3' },
          { label: 'Mortality Rate', value: '0.8%', icon: Activity, trend: '-0.2%' },
        ].map((stat, i) => (
          <div key={i} className="card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
                <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
                <p className={`text-sm mt-2 ${stat.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.trend} from last month
                </p>
              </div>
              <div className="p-3 bg-[var(--primary)] bg-opacity-10 rounded-lg">
                <stat.icon className="w-6 h-6 text-[var(--primary)]" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/dashboard/expenses" className="card group hover:border-[var(--primary)] transition-colors">
          <h2 className="text-xl font-semibold mb-2 group-hover:text-[var(--primary)]">Manage Expenses</h2>
          <p className="text-gray-600">Track and manage all farm expenses in one place</p>
        </Link>
        <Link href="/dashboard/incomes" className="card group hover:border-[var(--primary)] transition-colors">
          <h2 className="text-xl font-semibold mb-2 group-hover:text-[var(--primary)]">Record Income</h2>
          <p className="text-gray-600">Monitor and record all income sources</p>
        </Link>
      </div>
    </div>
  )
}

