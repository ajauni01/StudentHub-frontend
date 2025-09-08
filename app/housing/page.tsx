import { Card, CardHeader, CardContent } from 'shadcn-ui/card';
import Link from 'next/link';

async function getHousing() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  const res = await fetch(`${apiUrl}/housing`, { next: { revalidate: 0 } });
  if (!res.ok) return [];
  return res.json();
}

export default async function HousingPage() {
  const posts = await getHousing();
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Housing & Sublease</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((post: any) => (
          <Card key={post._id}>
            <CardHeader className="font-semibold">{post.title}</CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700">{post.description}</p>
              {post.payRate && <p className="text-sm mt-2">${post.payRate} / month</p>}
              <Link href={`/jobs/${post._id}`} className="text-blue-600">Details →</Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}