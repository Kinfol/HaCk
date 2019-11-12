'use strict';
// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'eu-west-1'});
const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

module.exports.handler = async event => {


  var params = {
    Item: { // a map of attribute name to AttributeValue
    "name": {
      "S": "morriston2"
    },
    "parking_areas": {
      "M": {
        "areas": {
          "M": {
            "north": {
              "L": [
                {
                  "N": "3"
                }
              ]
            },
            "south": {
              "L": [
                {
                  "N": "2"
                }
              ]
            },
            "west": {
              "L": [
                {
                  "N": "5"
                }
              ]
            }
          }
        }
      }
    }
  }, 
  TableName: process.env.parking_area_current_table
};
  var results = await ddb.putItem(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        results: results,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
