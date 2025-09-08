"use client";
import { useState } from 'react';
import { Card, CardHeader, CardContent } from 'shadcn-ui/card';

/*
 * Navigation Page
 *
 * Provides an interactive form to get directions between two campus
 * locations. It calls the `/navigation` API on the backend and displays
 * the resulting path and step-by-step instructions.
 */

export default function NavigationPage() {
  // Default values can be campus locations or arbitrary addresses/coords
  const [origin, setOrigin] = useState('Student Center');
  const [destination, setDestination] = useState('Library');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResult(null);
    setError(null);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const res = await fetch(
        `${apiUrl}/navigation?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to get directions');
        return;
      }
      setResult(data);
    } catch (err) {
      setError('Failed to get directions');
    }
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Navigation</h1>
      <p className="mb-4 text-sm text-gray-600">
        Enter campus location names, street addresses, or latitude/longitude pairs. The system will determine whether
        to use on‑campus routing or Google Directions automatically.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Origin</label>
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter campus location, address, or lat,lng"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Destination</label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter campus location, address, or lat,lng"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
          Get Directions
        </button>
      </form>
      {error && <p className="mt-4 text-red-600">{error}</p>}
      {result && (
        <Card className="mt-6">
          <CardHeader className="font-semibold">Directions</CardHeader>
          <CardContent>
            <ol className="list-decimal ml-6 space-y-2">
              {result.instructions.map((instr: string, idx: number) => (
                <li key={idx}>{instr}</li>
              ))}
            </ol>
          </CardContent>
        </Card>
      )}
    </div>
  );
}