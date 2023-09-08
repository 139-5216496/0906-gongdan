const { sendMail } = require('../api/sendCode');
const { generateCode } = require('../utils/utils');
Parse.Cloud.define('getAllUser', async (request, response) => {
  const query = new Parse.Query('_User');
  return query.find({ useMasterKey: true });
});

Parse.Cloud.define('adminAmendClass', async (request, response) => {
  const { id, form, obj } = request.params;
  console.log(id, form, obj);
  const todo = Parse.Object.extend(form).createWithoutData(id);
  const keys = Object.keys(obj);
  keys.map(item => {
    todo.set(item, obj[item]);
  });
  return todo.save(null, { useMasterKey: true });
});

Parse.Cloud.define('setRole', async (request, response) => {
  const obj = request.params.obj;
  const userObj = Parse.Object.extend('_User').createWithoutData(obj.id);
  const adminRoleObj = Parse.Object.extend('_Role').createWithoutData('n12bDpsKvK');
  if (obj.plus) {
    adminRoleObj.relation('users').add(userObj);
  } else {
    adminRoleObj.relation('users').remove(userObj);
  }
  return adminRoleObj.save(null, { useMasterKey: true });
});

Parse.Cloud.define('sendCode', async (request, response) => {
  const code = generateCode();
  const user = request.user;
  if (!user) return '非法访问';
  const codeExpire = new Date(Date.now() + 10 * 60 * 1000); //10分钟有效期
  const todo = Parse.Object.extend('_User').createWithoutData(user.id);
  todo.set('code', code);
  todo.set('codeExpire', codeExpire);
  let r = await todo.save(null, { useMasterKey: true });
  if (r) {
    return '成功';
  } else {
    return '失败';
  }

  // 发送邮件
  let result = await sendMail(request.params.email, code);
  if (result.status == 200) {
    const codeExpire = Date.now() + 10 * 60 * 1000; //10分钟有效期
    const todo = Parse.Object.extend('_User').createWithoutData(user.id);
    todo.set('code', code);
    todo.set('codeExpire', codeExpire);
    let r = await todo.save(null, { useMasterKey: true });
    return result;
  } else {
    return result;
  }
  // const result = sendMail(req.params.email, code);
});

Parse.Cloud.define('resetPwd', async (request, response) => {
  if (!request.user) return '非法访问';
  const { code, newPwd } = request.params;
  const query = new Parse.Query('_User');
});
