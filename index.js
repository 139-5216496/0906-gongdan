const express = require('express');
const cors = require('cors');
const bodypaser = require('body-parser');
const parse = require('./api/parseServer.js');
const dashboard = require('./api/parseDashBoard.js');
// const { sendCode } = require('./api/sendCode.js');
const app = express();

// api.start(); // parse-server 6.x版本 使用实例的start方法进行启动。
// app.use('/parse', api.app); // 把api.app挂载到中间件
app.use(cors());
app.use(bodypaser.json());
app.use('/parse', parse); // parse-server 5.x版本
app.use('/admin', dashboard);
// app.use('/sendCode', sendCode);

app.use((req, res) => {
  res.json({
    msg: '404',
  });
});

const port = 1337;
app.listen(port, function () {
  console.log('parse-server-example running on port ' + port + '.');
});
