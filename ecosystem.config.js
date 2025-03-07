module.exports = {
  apps: [{
    name: 'biottic-server',
    script: 'src/server/index.ts',
    interpreter: 'node',
    interpreter_args: '-r tsx/cjs',
    instances: process.env.NODE_ENV === 'production' ? 'max' : 1,
    exec_mode: process.env.NODE_ENV === 'production' ? 'cluster' : 'fork',
    watch: process.env.NODE_ENV === 'development',
    max_memory_restart: '1G',
    env_development: {
      NODE_ENV: 'development',
      PORT: 3000,
      MONGODB_URI: 'mongodb://localhost:27017/biottic',
      CORS_ORIGINS: 'http://localhost:5173'
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000,
      MONGODB_URI: process.env.MONGODB_URI,
      CORS_ORIGINS: 'https://test.biottic.com.co,https://biottic.com.co'
    },
    error_file: process.env.NODE_ENV === 'production' 
      ? '/var/log/biottic/err.log'
      : './logs/err.log',
    out_file: process.env.NODE_ENV === 'production'
      ? '/var/log/biottic/out.log'
      : './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
  }]
}
