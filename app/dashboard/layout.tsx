'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogOut, Home, DollarSign, TrendingUp, Users, Settings } from 'lucide-react'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter()

  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: DollarSign, label: 'Expenses', href: '/dashboard/expenses' },
    { icon: TrendingUp, label: 'Incomes', href: '/dashboard/incomes' },
    { icon: Users, label: 'Batches', href: '/dashboard/batches' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  ]

  return (
    <div className="min-h-screen bg-[var(--muted)]">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 border-r border-[var(--border)]">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-[var(--primary)]">AJB Poultry</h1>
        </div>
        <nav className="mt-6">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center px-6 py-3 text-gray-600 hover:bg-[var(--muted)] hover:text-[var(--primary)] transition-colors"
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="flex-1" />
            <button
              onClick={() => router.push('/')}
              className="flex items-center text-gray-600 hover:text-[var(--primary)]"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Sign Out
            </button>
          </div>
          {children}
        </div>
      </main>
    </div>
  )
}

