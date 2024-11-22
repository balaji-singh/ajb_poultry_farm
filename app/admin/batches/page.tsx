import Link from 'next/link'

export default function BatchesPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Batches</h1>
        <Link href="/admin" className="text-blue-500 hover:underline">Back to Dashboard</Link>
        {/* Add batches content here */}
      </div>
    </div>
  )
}

