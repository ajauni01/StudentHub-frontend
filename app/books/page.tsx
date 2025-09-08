import { Card, CardHeader, CardContent } from 'shadcn-ui/card';
import Link from 'next/link';

async function getBooks() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  const res = await fetch(`${apiUrl}/books`, { next: { revalidate: 0 } });
  if (!res.ok) return [];
  return res.json();
}

export default async function BooksPage() {
  const books = await getBooks();
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Buy & Sell Books</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {books.map((book: any) => (
          <Card key={book._id}>
            <CardHeader className="font-semibold">{book.title}</CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700">{book.description}</p>
              {book.payRate && <p className="text-sm mt-2">${book.payRate}</p>}
              <Link href={`/jobs/${book._id}`} className="text-blue-600">Details →</Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}