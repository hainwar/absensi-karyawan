'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface Absensi {
  id: string
  nama: string
  tanggal: string
  waktu: string
  status: 'Hadir' | 'Terlambat' | 'Izin' | 'Sakit'
}

interface AbsensiContextType {
  absensiList: Absensi[]
  addAbsensi: (absensi: Omit<Absensi, 'id' | 'tanggal' | 'waktu'>) => void
}

const AbsensiContext = createContext<AbsensiContextType | undefined>(undefined)

export const useAbsensi = () => {
  const context = useContext(AbsensiContext)
  if (!context) {
    throw new Error('useAbsensi must be used within an AbsensiProvider')
  }
  return context
}

export const AbsensiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [absensiList, setAbsensiList] = useState<Absensi[]>([])

  useEffect(() => {
    const storedAbsensi = localStorage.getItem('absensiList')
    if (storedAbsensi) {
      setAbsensiList(JSON.parse(storedAbsensi))
    }
  }, [])

  const addAbsensi = (newAbsensi: Omit<Absensi, 'id' | 'tanggal' | 'waktu'>) => {
    const absensi: Absensi = {
      ...newAbsensi,
      id: Date.now().toString(),
      tanggal: new Date().toISOString().split('T')[0],
      waktu: new Date().toTimeString().split(' ')[0],
    }
    setAbsensiList(prevList => {
      const updatedList = [...prevList, absensi]
      localStorage.setItem('absensiList', JSON.stringify(updatedList))
      return updatedList
    })
  }

  return (
    <AbsensiContext.Provider value={{ absensiList, addAbsensi }}>
      {children}
    </AbsensiContext.Provider>
  )
}

