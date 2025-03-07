import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default {
  paths: {
    '@/*': resolve(__dirname, './src/*')
  }
};