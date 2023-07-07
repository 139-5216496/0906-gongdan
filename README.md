## 环境准备
- nodejs v14+
- MongoDB v4+

以上环境版本可参考[官网文档](https://github.com/parse-community/parse-server#compatibility)

## 安装执行parse-server

```zsh
sh <(curl -fsSL https://raw.githubusercontent.com/parse-community/parse-server/master/bootstrap.sh)
npm install -g mongodb-runner // mongoddb-runner只是驱动器，务必保证MongoDB已安装
mongodb-runner start
npm start
```

## 安装parse-dashboard
对于生产项目而言parse-dashboard并不是必要的, 为了更好上手parse-server开发, 和了解parse-dashboard本身, 我们需要它
```zsh
  // 安装方式1
  npm install -g parse-dashboard

  // 安装方式2 (更推荐,后续可以按需修改parse-dashboard功能)
  mkdir testDir && cd testDir // 假设我们在testDir安装
  git clone https://github.com/parse-community/parse-dashboard.git
  npm install
  npm link // 把parse-dashboard注册到全局

  //无论安装方式是1或2, 在parse-server项目运行之后, 都可执行以下指令
  parse-dashboard --dev --appId yourAppId --masterKey yourMasterKey --serverURL "https://example.com/parse" --appName optionalName
```

然后打开 http://localhost:4040/ 即可访问