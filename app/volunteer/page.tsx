import { Card, CardHeader, CardContent } from 'shadcn-ui/card';
import Link from 'next/link';

async function getVolunteerJobs() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  const res = await fetch(`${apiUrl}/volunteer`, { next: { revalidate: 0 } });
  if (!res.ok) return [];
  return res.json();
}

export default async function VolunteerPage() {
  const jobs = await getVolunteerJobs();
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Volunteer & Non‑profit Opportunities</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map((job: any) => (
          <Card key={job._id}>
            <CardHeader className="font-semibold">{job.title}</CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700">{job.description}</p>
              <Link href={`/jobs/${job._id}`} className="text-blue-600">Details →</Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}