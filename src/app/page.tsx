'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { UserStore } from '@/global/userStore'
import LandingPage from './_components/LandingPage'

export default function Home() {
  const router = useRouter()
  const status = UserStore((state) => state.status)
  const hasHydrated = UserStore((state) => state._hasHydrated)

  useEffect(() => {
    if (hasHydrated && status === 'authenticated') {
      router.replace('/dashboard')
    }
  }, [hasHydrated, status, router])

  if (!hasHydrated) return null
  if (status === 'authenticated') return null

  return <LandingPage />
}
