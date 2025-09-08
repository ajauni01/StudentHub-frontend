import { Card, CardHeader, CardContent } from 'shadcn-ui/card';

/*
 * Interns Page
 *
 * Displays a selection of fellow interns. This page fetches data from
 * the `/interns` API, which returns a small set of students who are
 * currently interning. In future iterations you could add a search
 * parameter for specific companies or locations.
 */
async function getInterns() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  const res = await fetch(`${apiUrl}/interns`, { next: { revalidate: 0 } });
  if (!res.ok) return [];
  return res.json();
}

export default async function InternsPage() {
  const interns = await getInterns();
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Find Fellow Interns</h1>
      {interns.length === 0 ? (
        <p>No interns found. Once users begin to intern at companies, they will appear here.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {interns.map((intern: any) => (
            <Card key={intern.id}>
              <CardHeader className="font-semibold">{intern.name}</CardHeader>
              <CardContent>
                <p className="text-sm">{intern.email}</p>
                {intern.company && <p className="text-sm mt-1">Company: {intern.company}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}