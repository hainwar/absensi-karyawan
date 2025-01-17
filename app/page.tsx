import LoginForm from '@/components/LoginForm'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-2xl">
        <h1 className="text-4xl font-bold text-center text-gray-800">Al-Amin Raoe Motor</h1>
        <LoginForm />
      </div>
    </main>
  )
}

