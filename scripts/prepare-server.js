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
  const serverDir = join(projectRoot, 'dist', 'server');
  
  // Asegurar que el directorio existe
  await ensureDir(serverDir);
  
  // Copiar archivos necesarios
  const filesToCopy = [
    {
      src: join(projectRoot, 'src', 'server', 'scripts'),
      dest: join(serverDir, 'scripts')
    }
  ];

  for (const file of filesToCopy) {
    await fs.cp(file.src, file.dest, { recursive: true });
  }

  console.log('Server files prepared successfully');
};

main().catch(console.error);
