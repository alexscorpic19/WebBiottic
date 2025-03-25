import cors from 'cors';

const corsOrigins = process.env.CORS_ORIGINS?.split(',') || [
  'http://localhost:5173',
  'https://test.biottic.com.co',
  'https://biottic.com.co'
];

console.log('CORS origins configured:', corsOrigins);

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, etc)
    if (!origin) {
      return callback(null, true);
    }
    
    if (corsOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    console.log(`CORS blocked request from origin: ${origin}`);
    callback(null, false);  // Changed from throwing error to just returning false
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
});
