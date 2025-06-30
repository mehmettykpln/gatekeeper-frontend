import "./globals.css";
import Navbar from '@/components/ui/Navbar';



export const metadata = {
  title: "GateKeeper",
  description: "Personel Takip Sistemi",
  icons: {
    icon: "/logo.png", 
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="tr">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
