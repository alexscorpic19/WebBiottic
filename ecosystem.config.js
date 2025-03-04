module.exports = {
  apps: [{
    name: 'biottic-server',
    script: 'src/server/index.ts',
    interpreter: 'node',
    interpreter_args: '-r tsx/cjs',
    instances: 'max',
    exec_mode: 'cluster',
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      MONGODB_URI: 'mongodb://localhost:27017/biottic',
      // Otras variables de entorno necesarias
    }
  }]
}