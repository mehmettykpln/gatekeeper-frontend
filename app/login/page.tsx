"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useState } from "react"
import axios from 'axios'


export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async () => {
    setLoading(true)
    setError("")
    try {

      console.log("Giriş yapılacak e-posta:", email)
      console.log("Giriş yapılacak şifre:", password)
      const res = await axios.post('http://localhost:3001/api/auth/login', {
      email,
      password,
      },
      {withCredentials:true}
      )
      
      localStorage.setItem("token", res.data.token)
      router.push("/dashboard")
    } catch (err: any) {
      setError("Giriş başarısız. Bilgileri kontrol edin.")
    } finally {
      setLoading(false)
    }
  }

  return (
    
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-500 to-white flex items-center justify-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="space-y-4 pt-6">
          <h1 className="text-2xl font-bold text-center">GateKeeper Giriş</h1>
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Şifre"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button onClick={handleLogin} disabled={loading} className="w-full">
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </Button>
        </CardContent>
      </Card>
    </div>
    
  )
}
