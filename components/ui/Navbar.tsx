"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">
        

       <Link href="/" className="flex items-center space-x-3 hover:opacity-80">
       <img src="/logo.png" alt="GateKeeper Logo" className="h-10 w-10 rounded" />
        <span className="text-2xl font-bold text-gray-800">GateKeeper</span>
        </Link>

       
        
        <div className="flex items-center space-x-3">
          <Link href="/login">
            <Button variant="outline">Giriş Yap</Button>
          </Link>
          <Link href="/register">
            <Button className="bg-black text-white hover:bg-gray-800">
              Kayıt Ol
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
