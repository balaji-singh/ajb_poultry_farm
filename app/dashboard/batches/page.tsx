'use client'

import { useState, useEffect } from 'react'
import { getActiveBatch, getAllBatches, createBatch, updateBatch } from '@/app/actions/batchActions'

export default function BatchesPage() {
  const [activeBatch, setActiveBatch] = useState(null)
  const [batches, setBatches] = useState([])
  const [newBatch, setNewBatch] = useState({ name: '', startDate: '', numberOfBirds: 0 })
  const [editBatch, setEditBatch] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const [batchData, allBatches] = await Promise.all([
        getActiveBatch(),
        getAllBatches()
      ])
      setActiveBatch(batchData)
      setBatches(allBatches)
    }
    fetchData()
  }, [])

  const handleCreateSubmit = async (e) => {
    e.preventDefault()
    const created = await createBatch(newBatch)
    setBatches([...batches, created])
    setNewBatch({ name: '', startDate: '', numberOfBirds: 0 })
  }

  const handleUpdateSubmit = async (e) => {
    e.preventDefault()
    const updated = await updateBatch(editBatch)
    setBatches(batches.map(b => b.id === updated.id ? updated : b))
    setEditBatch(null)
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Batches</h1>
      
      {/* Create Batch Form */}
      <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Create New Batch</h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Batch Name</label>
              <input
                type="text"
                required
                value={newBatch.name}
                onChange={(e) => setNewBatch({...newBatch, name: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                required
                value={newBatch.startDate}
                onChange={(e) => setNewBatch({...newBatch, startDate: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Number of Birds</label>
              <input
                type="number"
                required
                min="1"
                value={newBatch.numberOfBirds}
                onChange={(e) => setNewBatch({...newBatch, numberOfBirds: parseInt(e.target.value)})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Batch
            </button>
          </form>
        </div>
      </div>

      {/* Active Batch Display */}
      {activeBatch && (
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Active Batch</h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Batch Name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{activeBatch.name}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Start Date</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{new Date(activeBatch.startDate).toLocaleDateString()}</dd>
              </div>
            </dl>
          </div>
        </div>
      )}

      <hr className="my-8 border-gray-200" />

      {/* Batch List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md mt-6">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">All Batches</h3>
        </div>
        <ul className="divide-y divide-gray-200">
          {batches.map((batch) => (
            <li key={batch.id} className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{batch.name}</p>
                  <p className="text-sm text-gray-500">
                    Started: {new Date(batch.startDate).toLocaleDateString()} | 
                    Birds: {batch.numberOfBirds} |
                    Status: {batch.isActive ? 'Active' : 'Inactive'}
                  </p>
                </div>
                <button
                  onClick={() => setEditBatch(batch)}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Edit Batch Modal */}
      {editBatch && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Edit Batch</h3>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Batch Name</label>
                <input
                  type="text"
                  value={editBatch.name}
                  onChange={(e) => setEditBatch({...editBatch, name: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  value={editBatch.startDate.split('T')[0]}
                  onChange={(e) => setEditBatch({...editBatch, startDate: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setEditBatch(null)}
                  className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

