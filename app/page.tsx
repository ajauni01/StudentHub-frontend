import Link from 'next/link';
import { Card, CardContent, CardHeader } from 'shadcn-ui/card';

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl font-bold mb-4">Welcome to StudentHub</h1>
        <p className="text-gray-700">Your one-stop platform to find jobs, housing, internships and connect with fellow students.</p>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="font-semibold">Find Jobs</CardHeader>
          <CardContent>
            <p>Browse hourly jobs and gigs from students and organisations.</p>
            <Link href="/jobs" className="text-blue-600">Go to Jobs →</Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="font-semibold">Volunteer & Intern</CardHeader>
          <CardContent>
            <p>Give back to your community or gain experience with internships and volunteer opportunities.</p>
            <Link href="/volunteer" className="text-blue-600">Find Volunteer Work →</Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="font-semibold">Find Housing</CardHeader>
          <CardContent>
            <p>Search for subleases and internships housing options.</p>
            <Link href="/housing" className="text-blue-600">Search Housing →</Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}