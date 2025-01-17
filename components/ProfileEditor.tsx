'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"

interface User {
  username: string;
  role: string;
}

export default function ProfileEditor() {
  const [user, setUser] = useState<User | null>(null)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement actual file upload to server
    toast({
      title: "Profil Diperbarui",
      description: "Foto profil Anda telah berhasil diperbarui.",
    })
  }

  if (!user) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Profil</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={avatarFile ? URL.createObjectURL(avatarFile) : `/avatars/${user.username}.jpg`} />
              <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <Label htmlFor="avatar">Ubah Foto Profil</Label>
              <Input id="avatar" type="file" accept="image/*" onChange={handleFileChange} />
            </div>
          </div>
          <Button type="submit">Simpan Perubahan</Button>
        </form>
      </CardContent>
    </Card>
  )
}

