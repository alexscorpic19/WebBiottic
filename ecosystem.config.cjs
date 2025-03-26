module.exports = {
  apps: [{
    name: "biottic-server",
    script: "./server/index.js",
    instances: 1,  // Cambia a 1 para depuración
    exec_mode: "fork",  // Cambia a fork para depuración
    env: {
      NODE_ENV: "production",
      PORT: 3000
    },
    wait_ready: true,
    kill_timeout: 3000,
    error_file: '/var/log/biottic/err.log',
    out_file: '/var/log/biottic/out.log',
    merge_logs: true,
    time: true,
    cwd: "/home/admin/web/test.biottic.com.co/public_html"
    
  }]
};
