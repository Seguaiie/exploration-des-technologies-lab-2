import cors from 'cors';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { convert, publicCategories } from './conversions.js';

export const app = express();

app.use(cors());
app.use(express.json());

app.use((request, response, next) => {
  const startedAt = Date.now();
  response.on('finish', () => {
    console.log(JSON.stringify({
      timestamp: new Date().toISOString(),
      method: request.method,
      path: request.originalUrl,
      status: response.statusCode,
      durationMs: Date.now() - startedAt
    }));
  });
  next();
});

app.get(['/health', '/api/health'], (request, response) => {
  response.set('Cache-Control', 'no-store');
  response.vary('Accept');
  if (request.query.format !== 'json' && request.get('Accept')?.includes('text/html') && request.accepts(['html', 'json']) === 'html') {
    return response.sendFile(fileURLToPath(new URL('./health.html', import.meta.url)));
  }
  response.json({ status: 'ok' });
});
app.get('/api/categories', (_request, response) => response.json(publicCategories()));

app.post('/api/convert', (request, response) => {
  const { category, value, from, to } = request.body ?? {};
  try {
    const result = convert(category, value, from, to);
    response.json({ value: Number(value), from, to, result });
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

app.use((_request, response) => response.status(404).json({ error: 'Route introuvable.' }));
