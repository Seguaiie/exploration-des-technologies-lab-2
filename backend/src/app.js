import cors from 'cors';
import express from 'express';
import { convert, publicCategories } from './conversions.js';

export const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (_request, response) => response.json({ status: 'ok' }));
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
