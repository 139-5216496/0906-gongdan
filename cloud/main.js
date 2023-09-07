Parse.Cloud.define('getAllUser', async (request, response) => {
  // console.log(Parse);
  const form = request.params.form;
  const query = new Parse.Query(form);
  return query.find({ useMasterKey: true });
});
