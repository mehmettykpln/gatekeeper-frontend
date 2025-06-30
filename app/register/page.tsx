'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import axios from 'axios';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    setError('');
    setSuccess('');
    try {
      const res = await axios.post('http://localhost:3001/api/auth/register', {
        ...form,
        role: 'USER',
      });
      setSuccess('Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...');
      setTimeout(() => router.push('/login'), 1500);
    } catch (err: any) {
      setError(
        err.response?.data?.message || 'Kayıt sırasında bir hata oluştu.'
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-500 to-white flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="space-y-4 pt-6">
          <h1 className="text-2xl font-bold text-center">Kayıt Ol</h1>

          <Input
            name="name"
            placeholder="Ad"
            value={form.name}
            onChange={handleChange}
          />
          <Input
            name="surname"
            placeholder="Soyad"
            value={form.surname}
            onChange={handleChange}
          />
          <Input
            name="email"
            placeholder="E-posta"
            value={form.email}
            onChange={handleChange}
          />
          <Input
            name="password"
            placeholder="Şifre"
            type="password"
            value={form.password}
            onChange={handleChange}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          <Button onClick={handleRegister} className="w-full">
            Kayıt Ol
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
