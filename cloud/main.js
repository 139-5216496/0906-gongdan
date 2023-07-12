Parse.Cloud.define('getRoles', async (request) => {
  const query = await new Parse.Query(Parse.Role).equalTo('users', request.user).find()
  return query
})