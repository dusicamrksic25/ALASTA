const { test, expect } = require('@playwright/test');
const { write, read } = require("../utils/common.js");
var headers = require("../Test-Data/Headers/Headers.json");
var UpdateUser = require("../Test-Data/Payload/UpdatePayload.json");
require('dotenv').config();

const baseUrl = process.env.URLAPI;

test('Create a new user', async ({ request }) => {
  const response = await request.post(baseUrl, {
    data: {
      name: 'Test User',
      email: 'Du1s24122ddr51ddhf@gmail.com',
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
  const response = await request.put(baseUrl+userid, {
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
  const response = await request.delete(baseUrl+userid, {
    headers: headers
  });

  expect(response.status()).toBe(204); // No Content
});
