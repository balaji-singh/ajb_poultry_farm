'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
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
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Mortality</h1>
        <Link href="/admin" className="text-blue-500 hover:underline mb-4 block">Back to Dashboard</Link>
        
        {activeBatch && (
          <p className="mb-4">Current Active Batch: {activeBatch.name}</p>
        )}

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="mb-4">
            <label htmlFor="count" className="block mb-2">Number of Birds Died:</label>
            <input
              type="number"
              id="count"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Mortality</button>
        </form>

        <h2 className="text-2xl font-bold mb-4">Mortality List</h2>
        <table className="w-full bg-white shadow-md rounded">
          <thead>
            <tr>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Count</th>
            </tr>
          </thead>
          <tbody>
            {mortalities.map((mortality) => (
              <tr key={mortality.id}>
                <td className="p-2">{new Date(mortality.date).toLocaleDateString()}</td>
                <td className="p-2">{mortality.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

