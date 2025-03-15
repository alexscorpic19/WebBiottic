import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const deploy = () => {
  try {
    // Build the application
    execSync('pnpm run build', { stdio: 'inherit' });

    // Copy package.json and package-lock.json to dist/server
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
    const serverPackageJson = {
      ...packageJson,
      dependencies: {
        cors: packageJson.dependencies.cors,
        joi: packageJson.dependencies.joi,
        express: packageJson.dependencies.express,
        // Add other server-side dependencies
      },
    };

    fs.writeFileSync(
      path.join('dist', 'server', 'package.json'),
      JSON.stringify(serverPackageJson, null, 2)
    );

    // Install production dependencies in dist/server
    execSync('cd dist/server && pnpm install --production', { stdio: 'inherit' });
  } catch (error) {
    console.error('Deployment failed:', error);
    process.exit(1);
  }
};

deploy();