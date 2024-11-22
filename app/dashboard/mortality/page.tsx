'use client'

import { useState, useEffect } from 'react'
import { addMortality, getMortalities } from '@/app/actions/mortalityActions'
import { getActiveBatch } from '@/app/actions/batchActions'

export default function MortalityPage() {
  const [count, setCount] = useState('')
  const [mortalities, setMortalities] = useState([])
  const [activeBatch, setActiveBatch] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const batchData = await getActiveBatch()
      setActiveBatch(batchData)
      const mortalitiesData = await getMortalities()
      setMortalities(mortalitiesData)
    }
    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await addMortality(parseInt(count))
    setCount('')
    const updatedMortalities = await getMortalities()
    setMortalities(updatedMortalities)
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Mortality</h1>
      
      {activeBatch && (
        <p className="mb-6 text-gray-600">Current Active Batch: {activeBatch.name}</p>
      )}

      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div>
          <label htmlFor="count" className="block text-sm font-medium text-gray-700 mb-1">Number of Birds Died:</label>
          <input
            type="number"
            id="count"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Mortality</button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Mortality List</h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-200 rounded-lg shadow">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Count</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {mortalities.map((mortality) => (
              <tr key={mortality.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(mortality.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{mortality.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

