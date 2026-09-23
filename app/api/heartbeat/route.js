export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json(
    {
      ok: true,
      service: 'portfolio',
      timestamp: new Date().toISOString(),
    },
    {
      headers: {
        'Cache-Control': 'no-store',
      },
    },
  );
}
