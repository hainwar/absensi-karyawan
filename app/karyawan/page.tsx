import KaryawanDashboard from '@/components/KaryawanDashboard'
import Header from '@/components/Header'
import ProfileEditor from '@/components/ProfileEditor'

export default function KaryawanPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto p-4 space-y-4">
        <KaryawanDashboard />
        <ProfileEditor />
      </main>
    </div>
  )
}

