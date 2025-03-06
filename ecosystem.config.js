export default {
  apps: [{
    name: 'biottic-server',
    script: './dist/server/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      MONGODB_URI: 'mongodb://localhost:27017/biottic',
      CONTACT_EMAIL: 'contacto@biottic.com.co',
      SMTP_HOST: 'smtp.gmail.com',
      SMTP_PORT: '587',
      SMTP_USER: 'tu-email@gmail.com',
      SMTP_PASS: 'tu-password'
    }
  }]
};
