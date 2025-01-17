import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"
import { AbsensiProvider } from '@/contexts/AbsensiContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Absensi Al-Amin Raoe Motor',
  description: 'Aplikasi absensi untuk karyawan Al-Amin Raoe Motor',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <AbsensiProvider>
          {children}
          <Toaster />
        </AbsensiProvider>
      </body>
    </html>
  )
}

