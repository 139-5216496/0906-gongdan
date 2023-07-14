Parse.Cloud.define('hello', async (request) => {
  const greeting = `Hello World!`;
  return greeting;
});
