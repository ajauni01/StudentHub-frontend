import { Card, CardHeader, CardContent } from 'shadcn-ui/card';

async function getMates(userId: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  const res = await fetch(`${apiUrl}/mates?userId=${userId}`, { next: { revalidate: 0 } });
  if (!res.ok) return [];
  const data = await res.json();
  return data.mates || [];
}

// Hard-coded test user ID for demonstration. Replace with actual user session ID.
const DEMO_USER_ID = '64b1a9f2e5a6d9b1f1e0c001';

export default async function MatesPage() {
  const mates = await getMates(DEMO_USER_ID);
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Find Mates</h1>
      {mates.length === 0 ? (
        <p>No mates recommendations found. Add more data to get matches.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mates.map((mate: any) => (
            <Card key={mate.id}>
              <CardHeader className="font-semibold">{mate.name}</CardHeader>
              <CardContent>
                <p>{mate.email}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}