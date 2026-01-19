// src/index.ts  (or rename to server.ts if you prefer)
import express, { type Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import config from './app/config';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/NotFound';
import { seedDatabase } from './app/DB';

const app: Application = express();
// Middleware 
const corsOptions = {
  origin: ['http://localhost:3000'], // ← add your production frontend domain later
  methods: '*',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/', router);
app.use(globalErrorHandler);
app.use(notFound);


const start = async () => {
  try {
    console.log('Seeding database...');
    await seedDatabase();
    console.log('Database seeded successfully');
  } catch (err) {
    console.error('Seeding failed:', err);
  }


  const isVercel = !!process.env.VERCEL;
  if (!isVercel) {
    const port = config.port || 5000;
    app.listen(port, () => {
      console.log(`Server running locally → http://localhost:${port}`);
    });
  }
};

// Run startup immediately
start().catch((err) => {
  console.error('Fatal startup error:', err);
  process.exit(1);
});

// ── Very important for Vercel ────────────────────────────────
export default app;