import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Registro de incidencias',
  description: 'Aplicación para registrar las incidencias del personal de Cdimex SA',
  icons: {
    icon: '/cdimex_icon.ico',
  },
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="es">
        <body className={inter.className}>{children}</body>
      </html>
  )
}
