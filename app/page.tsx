import LoginForm from '@/components/LoginForm'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome Back</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Sign in to manage your farm</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </main>
  )
}

