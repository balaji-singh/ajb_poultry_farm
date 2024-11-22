'use client'

import { useState, useEffect } from 'react'
import { addExpense, getExpenses } from '@/app/actions/expenseActions'
import { getActiveBatch } from '@/app/actions/batchActions'

export default function ExpensesPage() {
  const [expenseType, setExpenseType] = useState('')
  const [amount, setAmount] = useState('')
  const [expenses, setExpenses] = useState([])
  const [activeBatch, setActiveBatch] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const batchData = await getActiveBatch()
      setActiveBatch(batchData)
      const expensesData = await getExpenses()
      setExpenses(expensesData)
    }
    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await addExpense(expenseType, parseFloat(amount))
    setExpenseType('')
    setAmount('')
    const updatedExpenses = await getExpenses()
    setExpenses(updatedExpenses)
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Expenses</h1>
      
      {activeBatch && (
        <p className="mb-6 text-gray-600">Current Active Batch: {activeBatch.name}</p>
      )}

      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div>
          <label htmlFor="expenseType" className="block text-sm font-medium text-gray-700 mb-1">Expense Type:</label>
          <input
            type="text"
            id="expenseType"
            value={expenseType}
            onChange={(e) => setExpenseType(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            step="0.01"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Expense</button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Expense List</h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-200 rounded-lg shadow">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(expense.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{expense.expenseType}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${expense.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

