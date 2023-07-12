const express = require('express');
const { default: ParseServer } = require('parse-server');
let appConfig = require('./config.json')
console.log(`appConfig`,appConfig );
const app = express();
const api = new ParseServer({
  /**
   * 参数如下
    databaseURI: 数据库的连接字符串。
    Cloud: 通向应用程序云代码的路径。
    AppId: 应用程序的唯一标识符。
    FileKey: 指定用于文件存储的前缀的键。对于迁移的应用程序，这对于提供对已经托管在 Parse 上的文件的访问是必要的。
    masterKey：最高权限Key。请保密。
    ClientKey: 客户端Key
    RestAPIKey:  REST API Key(可选)
    JavascriptKey:  JavaScript key(可选)
    DotNetKey: .NET key(可选)
    Push: 包含 Push 配置的对象。参见这里
    FilesAdapter: An object that implements the FilesAdapter interface. For example, the S3 files adapter
    Auth: 配置对第三方身份验证的支持。
    MaxUploadSize: 最大文件上传大小(例如 nginx.conf client _ max _ body _ size 100m;)
   */

  ...appConfig,
  // "databaseURI": "mongodb://localhost:27017/parse", // 如果默认不填写这个字段,会自动创建一个名为parse的数据库
  // "databaseURI": "mongodb://localhost:27017/demo", // 显式指定创建demo数据库
  "databaseURI": "mongodb+srv://root:root@testdb.rg6zs3y.mongodb.net" // 云数据库,测试用
});
api.start(); // 使用实例的start方法进行启动。



// Serve the Parse API at /parse URL prefix
app.use('/parse', api.app); // 把api.app挂载到中间件

app.use('/index', (req, res) => {
  res.send('hello world')
})

const port = 1337;
app.listen(port, function() {
  console.log('parse-server-example running on port ' + port + '.');
});