import { Card, CardHeader, CardContent } from 'shadcn-ui/card';
import Link from 'next/link';

/*
 * Alumni Page
 *
 * Displays alumni connectors. By default it shows the most recent alumni.
 * If you wish to filter by major, you could pass a `major` query
 * parameter to the API (e.g. `/alumni?major=Computer%20Science`). For
 * demonstration this page lists whatever the API returns.
 */
async function getAlumni() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  const res = await fetch(`${apiUrl}/alumni`, { next: { revalidate: 0 } });
  if (!res.ok) return [];
  return res.json();
}

export default async function AlumniPage() {
  const alumni = await getAlumni();
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Alumni Connector</h1>
      {alumni.length === 0 ? (
        <p>No alumni connectors available at this time.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {alumni.map((alum: any) => (
            <Card key={alum.id}>
              <CardHeader className="font-semibold">{alum.name}</CardHeader>
              <CardContent>
                <p className="text-sm">{alum.email}</p>
                {alum.major && <p className="text-sm mt-1">Major: {alum.major}</p>}
                {alum.graduationYear && <p className="text-sm mt-1">Class of {alum.graduationYear}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}