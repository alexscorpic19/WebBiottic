import { promises as fs } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ensureDir = async (dirPath) => {
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
  }
};

const main = async () => {
  const projectRoot = join(__dirname, '..');
  const serverDir = join(projectRoot, 'dist');
  const serverCodeDir = join(serverDir, 'server');
  
  // Ensure server directories exist
  await ensureDir(serverDir);
  await ensureDir(serverCodeDir);
  
  // Create a minimal setup-dirs.sh script for deployment
  const setupDirsScript = `#!/bin/bash
# Create necessary directories
mkdir -p /var/log/biottic
chmod 755 /var/log/biottic
chown admin:admin /var/log/biottic

mkdir -p /home/admin/web/test.biottic.com.co/tmp
chmod 755 /home/admin/web/test.biottic.com.co/tmp
chown admin:admin /home/admin/web/test.biottic.com.co/tmp

echo "Directories created successfully"
`;

  await fs.writeFile(join(projectRoot, 'dist', 'setup-dirs.sh'), setupDirsScript);
  
  // Copy server scripts
  const scriptsDir = join(projectRoot, 'src', 'server', 'scripts');
  const destScriptsDir = join(serverCodeDir, 'scripts');
  
  try {
    await ensureDir(destScriptsDir);
    await fs.cp(scriptsDir, destScriptsDir, { recursive: true });
    console.log('Server scripts copied successfully');
  } catch (error) {
    console.warn('Warning: Could not copy server scripts:', error.message);
  }
  
  // Copy .env.example if it exists
  try {
    const envExamplePath = join(projectRoot, '.env.example');
    const destEnvPath = join(projectRoot, 'dist', '.env.example');
    await fs.copyFile(envExamplePath, destEnvPath);
    console.log('.env.example copied successfully');
  } catch (error) {
    console.warn('Warning: Could not copy .env.example:', error.message);
  }

  console.log('Server files prepared successfully');
};

main().catch(console.error);
