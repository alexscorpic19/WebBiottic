module.exports = {
  apps: [{
    name: 'biottic-server',
    script: './dist/server/index.js', // Cambiado para usar el archivo compilado
    instances: 'max',
    exec_mode: 'cluster',
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      MONGODB_URI: 'mongodb://localhost:27017/biottic'
    }
  }]
}
