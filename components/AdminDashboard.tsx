'use client'

import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Absensi {
  _id: string
  userId: {
    _id: string
    username: string
  }
  tanggal: string
  status: 'Hadir' | 'Terlambat' | 'Izin' | 'Sakit'
}

export default function AdminDashboard() {
  const [absensiList, setAbsensiList] = useState<Absensi[]>([])

  useEffect(() => {
    const fetchAbsensi = async () => {
      try {
        const response = await fetch('/api/absensi')
        if (response.ok) {
          const data = await response.json()
          setAbsensiList(data)
        } else {
          console.error('Failed to fetch absensi data')
        }
      } catch (error) {
        console.error('Error fetching absensi:', error)
      }
    }

    fetchAbsensi()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar Absensi Karyawan</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {absensiList.map((absensi) => (
              <TableRow key={absensi._id}>
                <TableCell>{absensi.userId.username}</TableCell>
                <TableCell>{new Date(absensi.tanggal).toLocaleDateString('id-ID')}</TableCell>
                <TableCell>{absensi.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

