const ParseDashboard = require('parse-dashboard');
const dashboard = new ParseDashboard({
  apps: [
    {
      serverURL: '/parse', // 注意这里的serverURL要和api的挂载路径一致, 此处仅做演示用，生产环境尽量不要公开数据库管理后台地址
      appId: 'gongdan',
      masterKey: 'gongdan',
      appName: 'gongdan-parse',
    },
  ],
  users: [
    {
      user: 'admin',
      pass: '123456',
      apps: [{ appId: 'gongdan', masterKey: 'gongdan' }],
    },
  ],
});

module.exports = dashboard;
