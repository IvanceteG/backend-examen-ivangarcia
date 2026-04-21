import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bacallaRouter from './routes/bacalla.js';
import { bacalla } from './data/bacalla.js';

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = [
  'http://localhost:3000',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`CORS: origen no permès — ${origin}`));
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  })
);

app.use(express.json());

app.use('/api/bacalla', bacallaRouter);

// Health check amb informació útil de l'API
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'API Bacallà funcionant',
    version: '1.0.0',
    endpoints: [
      { method: 'GET',  path: '/api/bacalla',     descripcio: 'Totes les varietats' },
      { method: 'GET',  path: '/api/bacalla/:id', descripcio: 'Detall d\'una varietat per id' },
      { method: 'POST', path: '/api/bacalla',     descripcio: 'Crear una nova varietat' },
    ],
    total_varietats: bacalla.length,
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escoltant a http://localhost:${PORT}`);
});
