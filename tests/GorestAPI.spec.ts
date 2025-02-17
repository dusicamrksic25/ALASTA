const { test, expect } = require('@playwright/test');
const { write, read } = require("../utils/common.js");
var headers = require("../Test-Data/Headers/Headers.json");
var UpdateUser = require("../Test-Data/Payload/UpdatePayload.json");

test('Create a new user', async ({ request }) => {
  const response = await request.post('https://gorest.co.in/public/v2/users', {
    data: {
      name: 'Test User',
      email: 'Du1s21ddr51ddhf@gmail.com',
      gender: 'male',
      status: 'active'
    },
    headers: headers
  });

  expect(response.status()).toBe(201);
  const responseBody = await response.json();
  
  write({response:responseBody,jsonFileName:"UserId"})
 const userId = responseBody.id;
  console.log(userId)
 expect(responseBody.name).toBe('Test User');

 
});

test('Update user details', async ({ request }) => {
  const jsonStr = read({ jsonFileName: 'UserId' });
    const userid = jsonStr.id; 
  const response = await request.put('https://gorest.co.in/public/v2/users/'+userid, {
    data: UpdateUser,
    headers:headers
  });

  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  expect(responseBody.name).toBe('Updated User');
});

test('Delete user', async ({ request }) => {
  const jsonStr = read({ jsonFileName: 'UserId' });
    const userid = jsonStr.id; 
  const response = await request.delete('https://gorest.co.in/public/v2/users/'+userid, {
    headers: headers
  });

  expect(response.status()).toBe(204); // No Content
});
