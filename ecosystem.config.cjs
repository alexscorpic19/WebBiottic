module.exports = {
  apps: [{
    name: 'biottic-server',
    script: 'server/index.js',
    instances: 4,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    wait_ready: true,
    kill_timeout: 3000,
    error_file: '/var/log/biottic/err.log',
    out_file: '/var/log/biottic/out.log',
    merge_logs: true,
    time: true
  }]
};