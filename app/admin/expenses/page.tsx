'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
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
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Expenses</h1>
        <Link href="/admin" className="text-blue-500 hover:underline mb-4 block">Back to Dashboard</Link>
        
        {activeBatch && (
          <p className="mb-4">Current Active Batch: {activeBatch.name}</p>
        )}

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="mb-4">
            <label htmlFor="expenseType" className="block mb-2">Expense Type:</label>
            <input
              type="text"
              id="expenseType"
              value={expenseType}
              onChange={(e) => setExpenseType(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="amount" className="block mb-2">Amount:</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              step="0.01"
              className="w-full p-2 border rounded"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Expense</button>
        </form>

        <h2 className="text-2xl font-bold mb-4">Expense List</h2>
        <table className="w-full bg-white shadow-md rounded">
          <thead>
            <tr>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Amount</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td className="p-2">{new Date(expense.date).toLocaleDateString()}</td>
                <td className="p-2">{expense.expenseType}</td>
                <td className="p-2">${expense.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

