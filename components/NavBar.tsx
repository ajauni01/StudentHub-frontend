import Link from 'next/link';
import { Button } from 'shadcn-ui/button';

export default function NavBar() {
  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Link href="/" className="font-bold text-lg">StudentHub</Link>
        <Link href="/jobs" className="text-sm">Jobs</Link>
        <Link href="/volunteer" className="text-sm">Volunteering</Link>
        <Link href="/housing" className="text-sm">Housing</Link>
        <Link href="/interns" className="text-sm">Interns</Link>
        <Link href="/internships" className="text-sm">Internships</Link>
        <Link href="/mates" className="text-sm">Mates</Link>
        <Link href="/alumni" className="text-sm">Alumni</Link>
        <Link href="/books" className="text-sm">Books</Link>
        <Link href="/international" className="text-sm">International</Link>
        <Link href="/navigation" className="text-sm">Navigation</Link>
      </div>
      <div className="space-x-2">
        <Button asChild><Link href="/login">Log in</Link></Button>
        <Button variant="outline" asChild><Link href="/register">Sign up</Link></Button>
      </div>
    </nav>
  );
}