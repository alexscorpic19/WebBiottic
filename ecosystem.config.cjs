module.exports = {
  apps: [{
    name: 'biottic-server',
    script: './server/index.js', // Ruta correcta al archivo del servidor
    instances: 'max',
    exec_mode: 'cluster',
    watch: false,
    max_memory_restart: '1G',
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000,
      MONGODB_URI: 'mongodb://localhost:27017/biottic',
      CORS_ORIGINS: 'https://test.biottic.com.co,https://biottic.com.co'
    },
    error_file: '/var/log/biottic/err.log',
    out_file: '/var/log/biottic/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    log_type: 'json',
    max_restarts: 10,
    restart_delay: 4000,
    wait_ready: true,
    kill_timeout: 3000,
    listen_timeout: 10000,
  }]
};