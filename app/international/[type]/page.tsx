import { notFound } from 'next/navigation';
import { Card, CardHeader, CardContent } from 'shadcn-ui/card';
import Link from 'next/link';

interface Props {
  params: { type: string };
}

async function getServices(type: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  const res = await fetch(`${apiUrl}/international/${type}`, { next: { revalidate: 0 } });
  if (!res.ok) return null;
  return res.json();
}

export default async function InternationalDetailPage({ params }: Props) {
  const services = await getServices(params.type);
  if (!services) return notFound();
  const titleMap: Record<string, string> = {
    visa: 'Visa Consultants',
    transfer: 'University Transfer',
    loan: 'Student Loans',
    sim: 'SIM Card Providers',
    tax: 'Tax Consultants',
  };
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">{titleMap[params.type] || params.type}</h1>
      <div className="space-y-4">
        {services.map((service: any, idx: number) => (
          <Card key={idx}>
            <CardHeader className="font-semibold">{service.name}</CardHeader>
            <CardContent>
              <a href={service.url} className="text-blue-600" target="_blank" rel="noopener noreferrer">Visit →</a>
            </CardContent>
          </Card>
        ))}
      </div>
      <Link href="/international" className="mt-4 text-blue-600 inline-block">← Back to categories</Link>
    </div>
  );
}