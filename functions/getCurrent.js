'use strict';
// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'eu-west-1'});
const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

module.exports.handler = async event => {

  var params = {
    Key: {
     "name": {
       S: "morriston"
      }
    }, 
    TableName: process.env.parking_area_current_table
  };
  var results = await ddb.getItem(params).promise();
  const parking_area = [{
    "WEST": 5
  },
  {
    "NORTH": 3
  },
  {
    "SOUTH": 2
  }];

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        parking_area: parking_area,
        total_space: '10',
        results: results,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
