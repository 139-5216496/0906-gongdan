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
