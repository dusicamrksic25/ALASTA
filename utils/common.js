const { expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

/* String format.
* @param str String, needs to be formatted.
* @param args Arguments, needs to be placed properly in the string.
*/
export const hashMap = new Map();
export const stringFormat = (str, ...args) =>
   str.replace(/{(\d+)}/g, (match, index) => args[index].toString() || "");

// Function to perform the GET request and check the API response
const getAndCheckResponse = async (request, url, headers, params) => {
  const getAPIResponse = await request.get(url, {
    headers: headers,
    params: params,
  });

  const responseData = await getAPIResponse.json();
  console.log('API Response:', responseData);

  expect(getAPIResponse.status()).toBe(200);

  return responseData.status === 'completed' ? responseData : null;
};

// Function to pull the API until the status is 'complete'
const pullApiUntilComplete = async (request, url, headers, params, timeout = 90000, interval = 5000) => {
  let responseData = null;
  const startTime = Date.now();

  while (Date.now() - startTime < timeout) {
    responseData = await getAndCheckResponse(request, url, headers, params);
    if (responseData) break;
    await new Promise(resolve => setTimeout(resolve, interval)); // Wait before polling again
  }

  if (!responseData) {
    throw new Error('Timeout: Status did not become completed');
  }

  return responseData;
};

// Helper functions for file operations
const getFilePath = (jsonFileName) => path.resolve(__dirname, `../Test-Data/${jsonFileName}.json`);

const write = ({ response, jsonFileName }) => {
  const filePath = getFilePath(jsonFileName);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  fs.writeFileSync(
    filePath,
    JSON.stringify(response, null, 2),
    { encoding: 'utf-8' }
  );
};

const read = ({ jsonFileName }) => {
  const filePath = getFilePath(jsonFileName);
  const jsonStr = fs.readFileSync(filePath, { encoding: 'utf-8' });
  return JSON.parse(jsonStr);
};

// Export all functions
module.exports = {
  pullApiUntilComplete,
  write,
  read
};
