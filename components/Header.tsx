'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface User {
  username: string;
  role: string;
}

export default function Header() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      router.push('/')
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  if (!user) return null

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <h1 className="text-2xl font-bold text-gray-800">Al-Amin Raoe Motor</h1>
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src={`/avatars/${user.username}.jpg`} />
          <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <span className="font-medium text-gray-700">{user.username}</span>
        <Button variant="outline" onClick={handleLogout}>Logout</Button>
      </div>
    </header>
  )
}

