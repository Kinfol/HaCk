'use strict';
// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'eu-west-1'});
const ddb = new AWS.DynamoDB.DocumentClient({region: 'eu-west-1'});

module.exports.handler = async event => {
  const requestBody = JSON.parse(event.body);
  console.log(requestBody);

  var params = {
    TableName: process.env.parking_area_current_table,
    Item: requestBody
  };

  var results = await ddb.put(params).promise();

  
  
  return {
    statusCode: 200
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
