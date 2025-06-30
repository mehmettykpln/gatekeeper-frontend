"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-500 to-white flex flex-col items-center justify-center gap-8 p-6">
      <h1 className="text-gray-100 text-6xl font-extrabold">GateKeeper</h1>
      <p className="text-gray-300 text-xl">Hoşgeldiniz! Lütfen giriş yapın veya kayıt olun.</p>

      <div className="flex gap-6">
        <button
          onClick={() => router.push("/login")}
          className="px-6 py-3 bg-white text-black font-semibold rounded-lg shadow-md hover:bg-gray-200 transition"
        >
          Giriş Yap
        </button>

        <button
          onClick={() => router.push("/register")}
          className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition"
        >
          Kayıt Ol
        </button>
      </div>
    </div>
  );
}
