import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function (request: VercelRequest, response: VercelResponse) {
  const { url } = request.query;

  if (!url || typeof url !== 'string') {
    return response.status(400).send('Missing or invalid "url" query parameter.');
  }

  try {
    const targetUrl = decodeURIComponent(url);
    const fetchResponse = await fetch(targetUrl);

    if (!fetchResponse.ok) {
      return response.status(fetchResponse.status).send(`Failed to fetch target URL: ${fetchResponse.statusText}`);
    }

    const contentType = fetchResponse.headers.get('content-type');
    if (contentType) {
      response.setHeader('Content-Type', contentType);
    }

    // Add CORS headers
    response.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins for simplicity, refine as needed
    response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const data = await fetchResponse.text();
    response.status(200).send(data);
  } catch (error: any) {
    console.error('Proxy error:', error);
    response.status(500).send(`Proxy error: ${error.message}`);
  }
}