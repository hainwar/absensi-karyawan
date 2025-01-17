import AdminDashboard from '@/components/AdminDashboard'
import Header from '@/components/Header'

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto p-4">
        <AdminDashboard />
      </main>
    </div>
  )
}

