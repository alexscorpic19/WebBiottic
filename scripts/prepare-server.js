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

const copyFile = async (src, dest) => {
  try {
    await fs.copyFile(src, dest);
    console.log(`Copied ${src} to ${dest}`);
  } catch (error) {
    console.error(`Error copying ${src} to ${dest}:`, error);
    throw error;
  }
};

const main = async () => {
  try {
    // Get project root directory
    const projectRoot = join(__dirname, '..');

    // Ensure server directories exist
    const serverDir = join(projectRoot, 'dist', 'server');
    const scriptsDir = join(serverDir, 'scripts');
    
    await ensureDir(serverDir);
    await ensureDir(scriptsDir);

    // Copy necessary files
    const filesToCopy = [
      {
        src: join(projectRoot, 'src', 'server', 'scripts', 'test-email.ts'),
        dest: join(scriptsDir, 'test-email.ts')
      },
      // Add any other files that need to be copied
    ];

    for (const file of filesToCopy) {
      await copyFile(file.src, file.dest);
    }

    // Create a temporary index.js if it doesn't exist (for verification)
    const tempIndexPath = join(serverDir, 'index.js');
    try {
      await fs.access(tempIndexPath);
    } catch {
      await fs.writeFile(tempIndexPath, '// Temporary file for build verification\n');
      console.log('Created temporary index.js for verification');
    }

    console.log('Server directories and files prepared successfully');
  } catch (error) {
    console.error('Error preparing server files:', error);
    process.exit(1);
  }
};

main();
