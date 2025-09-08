import Link from 'next/link';
import { Card, CardHeader, CardContent } from 'shadcn-ui/card';

const categories = [
  { id: 'visa', title: 'Visa Consultants' },
  { id: 'transfer', title: 'University Transfer' },
  { id: 'loan', title: 'Student Loans' },
  { id: 'sim', title: 'SIM Cards' },
  { id: 'tax', title: 'Tax Consultants' },
];

export default function InternationalPage() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">International Student Resources</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <Card key={cat.id}>
            <CardHeader className="font-semibold">{cat.title}</CardHeader>
            <CardContent>
              <Link href={`/international/${cat.id}`} className="text-blue-600">View →</Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}