import type { Metadata } from 'next'
import './globals.css'
import { SnackbarProviderWrapper } from '@/components/snackbar/SnackbarProviderWrapper'

export const metadata: Metadata = {
  title: 'Sistema de Abarrotes',
  description: 'Punto de Venta',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <SnackbarProviderWrapper>
          {children}
        </SnackbarProviderWrapper>
      </body>
    </html>
  )
}
