import dotenv from 'dotenv';
import path from 'path';
import app from './index.js';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`CORS origins: ${process.env.CORS_ORIGINS || 'default origins'}`);
});