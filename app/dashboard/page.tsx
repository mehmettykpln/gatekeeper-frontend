'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
    }

    
    setUser({ name: "Mehmet", email: "mehmet@example.com" }) 
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.push("/login")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">👋 Hoş geldin, {user?.name}</h1>
        <p className="mb-6 text-gray-600">{user?.email}</p>
        <Button onClick={handleLogout}>Çıkış Yap</Button>
      </div>
    </div>
  )
}
