'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { UserStore } from '@/global/userStore'
import UsuariosHome from './_components/UsuariosHome'

export default function UsuariosPage() {
  const router = useRouter()
  const rol = UserStore((state) => state.rol)
  const hasHydrated = UserStore((state) => state._hasHydrated)

  useEffect(() => {
    if (hasHydrated && rol === 'Empleado') {
      router.replace('/dashboard')
    }
  }, [hasHydrated, rol, router])

  if (!hasHydrated || rol === 'Empleado') return null

  return <UsuariosHome />
}
