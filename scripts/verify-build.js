import { promises as fs } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const rootDir = join(__filename, '..', '..');

async function verifyBuild() {
  try {
    const distPath = join(rootDir, 'dist');
    await fs.access(distPath);

    const clientAssetsPath = join(distPath, 'assets');
    await fs.access(clientAssetsPath);

    const serverPath = join(distPath, 'server');
    await fs.access(serverPath);

    console.log('Build verification successful!');
    process.exit(0);
  } catch (error) {
    console.error('Build verification failed:', error);
    process.exit(1);
  }
}

verifyBuild();