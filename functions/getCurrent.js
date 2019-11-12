'use strict';
// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'eu-west-1'});
const ddb = new AWS.DynamoDB.DocumentClient({region: 'eu-west-1'});

module.exports.handler = async (event, context) => {
  console.log(event);

  var params = {
    Key: { name:  event.pathParameters.name}, 
    TableName: process.env.parking_area_current_table
  };
  var results = await ddb.get(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(results.Item)
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
