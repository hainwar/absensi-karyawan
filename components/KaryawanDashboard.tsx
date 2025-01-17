'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

export default function KaryawanDashboard() {
  const [status, setStatus] = useState('')
  const [user, setUser] = useState<{ id: string, username: string } | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleAbsen = async (absenStatus: 'Hadir' | 'Terlambat' | 'Izin' | 'Sakit') => {
    if (user) {
      try {
        const response = await fetch('/api/absensi', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id, status: absenStatus }),
        });
        if (response.ok) {
          setStatus(absenStatus)
          toast({
            title: "Absensi Berhasil",
            description: `Anda telah melakukan absen dengan status: ${absenStatus}`,
          })
        } else {
          throw new Error('Absensi gagal')
        }
      } catch (error) {
        console.error('Absensi error:', error)
        toast({
          title: "Absensi Gagal",
          description: "Terjadi kesalahan saat melakukan absensi",
          variant: "destructive",
        })
      }
    } else {
      toast({
        title: "Absensi Gagal",
        description: "Tidak dapat menemukan data pengguna",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Absensi Hari Ini</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Button onClick={() => handleAbsen('Hadir')} variant={status === 'Hadir' ? 'default' : 'outline'}>
            Hadir
          </Button>
          <Button onClick={() => handleAbsen('Terlambat')} variant={status === 'Terlambat' ? 'default' : 'outline'}>
            Terlambat
          </Button>
          <Button onClick={() => handleAbsen('Izin')} variant={status === 'Izin' ? 'default' : 'outline'}>
            Izin
          </Button>
          <Button onClick={() => handleAbsen('Sakit')} variant={status === 'Sakit' ? 'default' : 'outline'}>
            Sakit
          </Button>
        </div>
        {status && (
          <p className="text-center text-green-600 font-semibold">
            Status absensi Anda: {status}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

