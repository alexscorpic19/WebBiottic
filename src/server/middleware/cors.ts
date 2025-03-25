import cors from 'cors';

const corsOrigins = process.env.CORS_ORIGINS?.split(',') || [
  'http://localhost:5173',
  'https://test.biottic.com.co',
  'https://biottic.com.co'
];

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    // For OPTIONS requests and when origin is null (same origin)
    if (!origin || corsOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log(`CORS blocked request from origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
});
