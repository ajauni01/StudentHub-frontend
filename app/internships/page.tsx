import { Card, CardHeader, CardContent } from 'shadcn-ui/card';
import Link from 'next/link';

/*
 * Internships Page
 *
 * Displays internship listings. These may include paid and non-profit
 * opportunities. For now we simply fetch all internships; you can
 * extend this page to filter by organisation or non-profit status
 * using query parameters (`?nonprofit=true`).
 */
async function getInternships() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  const res = await fetch(`${apiUrl}/internships`, { next: { revalidate: 0 } });
  if (!res.ok) return [];
  return res.json();
}

export default async function InternshipsPage() {
  const internships = await getInternships();
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Internship Opportunities</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {internships.map((job: any) => (
          <Card key={job._id}>
            <CardHeader className="font-semibold">{job.title}</CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700">{job.description}</p>
              {job.payRate && <p className="text-sm mt-2">${job.payRate}</p>}
              <Link href={`/jobs/${job._id}`} className="text-blue-600">Details →</Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}