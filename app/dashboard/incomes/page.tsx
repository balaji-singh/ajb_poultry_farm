'use client'

import { useState, useEffect } from 'react'
import { addIncome, getIncomes } from '@/app/actions/incomeActions'
import { getActiveBatch } from '@/app/actions/batchActions'

export default function IncomesPage() {
  const [incomeType, setIncomeType] = useState('')
  const [amount, setAmount] = useState('')
  const [incomes, setIncomes] = useState([])
  const [activeBatch, setActiveBatch] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const batchData = await getActiveBatch()
      setActiveBatch(batchData)
      const incomesData = await getIncomes()
      setIncomes(incomesData)
    }
    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await addIncome(incomeType, parseFloat(amount))
    setIncomeType('')
    setAmount('')
    const updatedIncomes = await getIncomes()
    setIncomes(updatedIncomes)
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Incomes</h1>
      
      {activeBatch && (
        <p className="mb-4">Current Active Batch: {activeBatch.name}</p>
      )}

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label htmlFor="incomeType" className="block mb-2">Income Type:</label>
          <input
            type="text"
            id="incomeType"
            value={incomeType}
            onChange={(e) => setIncomeType(e.target.value)}
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
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Income</button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Income List</h2>
      <table className="w-full bg-white shadow-md rounded">
        <thead>
          <tr>
            <th className="p-2 text-left">Date</th>
            <th className="p-2 text-left">Type</th>
            <th className="p-2 text-left">Amount</th>
          </tr>
        </thead>
        <tbody>
          {incomes.map((income) => (
            <tr key={income.id}>
              <td className="p-2">{new Date(income.date).toLocaleDateString()}</td>
              <td className="p-2">{income.incomeType}</td>
              <td className="p-2">${income.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

