import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5174',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 30000,
    requestTimeout: 30000,
    responseTimeout: 30000,
    video: true,
    screenshotOnRunFailure: true,
    supportFile: 'cypress/support/e2e.ts',
    setupNodeEvents(on) {
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
        table(message) {
          console.table(message);
          return null;
        }
      });
    },
    env: {
      apiUrl: 'http://localhost:3000/api',
      CI: true
    }
  },
  retries: {
    runMode: 2,
    openMode: 0
  },
  video: false // Desactivar videos para reducir el tiempo de CI
});
