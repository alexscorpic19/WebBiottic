module.exports = {
  apps: [{
    name: "biottic-server",
    script: "./server/index.js",
    instances: "max",
    exec_mode: "cluster",
    env_production: {
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
