import { Card, CardHeader, CardContent } from 'shadcn-ui/card';
import { notFound } from 'next/navigation';

interface JobParams {
  params: { id: string };
}

async function getJob(id: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  const res = await fetch(`${apiUrl}/jobs/${id}`, { next: { revalidate: 0 } });
  if (!res.ok) {
    return null;
  }
  return res.json();
}

export default async function JobDetailPage({ params }: JobParams) {
  const job = await getJob(params.id);
  if (!job) return notFound();
  return (
    <Card>
      <CardHeader className="font-semibold text-xl">{job.title}</CardHeader>
      <CardContent>
        <p>{job.description}</p>
        {job.payRate && <p className="mt-2">${job.payRate}/hr</p>}
        {job.location && <p className="mt-2">Location: {job.location}</p>}
        {job.organisation && job.organisation.name && (
          <p className="mt-2">Organisation: {job.organisation.name}</p>
        )}
      </CardContent>
    </Card>
  );
}