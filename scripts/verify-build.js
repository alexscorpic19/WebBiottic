const fs = require('fs');
const path = require('path');

const requiredFiles = [
  'dist/server/index.js',
  'dist/index.html',
  'dist/assets'
];

const verifyBuild = () => {
  console.log('Verificando build...');
  
  for (const file of requiredFiles) {
    const fullPath = path.join(process.cwd(), file);
    if (!fs.existsSync(fullPath)) {
      console.error(`Error: ${file} no encontrado`);
      process.exit(1);
    }
  }

  console.log('Build verificado correctamente');
};

verifyBuild();