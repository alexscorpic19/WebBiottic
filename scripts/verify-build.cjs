const fs = require('fs');
const path = require('path');

const requiredFiles = [
  'dist/server/index.js',
  'dist/index.html',
  'dist/assets'
];

const verifyBuild = async () => {
  console.log('Verificando build...');
  
  try {
    for (const file of requiredFiles) {
      const fullPath = path.join(__dirname, '..', file);
      try {
        await fs.promises.access(fullPath);
      } catch {
        console.error(`Error: ${file} no encontrado`);
        process.exit(1);
      }
    }

    console.log('Build verificado correctamente');
  } catch (error) {
    console.error('Error durante la verificación:', error);
    process.exit(1);
  }
};

verifyBuild();