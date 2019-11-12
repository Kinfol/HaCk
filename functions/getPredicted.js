'use strict';
// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'eu-west-1'});
const ddb = new AWS.DynamoDB.DocumentClient({region: 'eu-west-1'});

module.exports.handler = async (event, context) => {
  console.log(event.pathParameters);

  var params = {
    Key: event.pathParameters,
    TableName: process.env.parking_table
  };
  try {
    var results = await ddb.get(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(results.Item)
    };
  }catch(error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    };
  }

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
