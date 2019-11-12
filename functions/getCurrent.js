'use strict';

module.exports.handler = async event => {
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
        total_space: '10'
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
