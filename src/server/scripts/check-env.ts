import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
const envPath = path.resolve(process.cwd(), '.env');
console.log('Loading .env from:', envPath);
const result = dotenv.config({ path: envPath });

if (result.error) {
  console.error('Error loading .env file:', result.error);
} else {
  console.log('.env file loaded successfully');
}

// Check critical environment variables
const criticalVars = [
  'NODE_ENV',
  'MONGODB_URI',
  'EMAIL_SERVICE',
  'EMAIL_USER',
  'EMAIL_PASS',
  'EMAIL_FROM',
  'EMAIL_TO'
];

console.log('\nEnvironment Variables:');
criticalVars.forEach(varName => {
  console.log(`- ${varName}: ${process.env[varName] ? 
    (varName.includes('PASS') ? '[SET]' : process.env[varName]) : 
    '[NOT SET]'}`);
});

console.log('\nCurrent working directory:', process.cwd());



