import '@/app/globals.css';
import { ReactNode } from 'react';
import NavBar from '@/components/NavBar';

export const metadata = {
  title: 'StudentHub',
  description: 'Marketplace and community for students',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}