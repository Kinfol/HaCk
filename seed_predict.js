const { REGION, STAGE } = process.env

const AWS = require('aws-sdk')
AWS.config.region = 'eu-west-1'
const dynamodb = new AWS.DynamoDB.DocumentClient()

let predict = [
  {
    "name": "morriston",
    "time": "2019-11-12T15:30:00",
    "parking_areas": [
        {
            "name": "NORTH",
            "spaces": 6
        },
        {
            "name": "SOUTH",
            "spaces": 4
        },
        {
            "name": "EAST",
            "spaces": 4
        }
    ],
    predicted_space: 14,
    reason: "hackathon finishes at 4pm",
  },
  {
    "name": "morriston",
    "time": "2019-11-12T15:00:00",
    "parking_areas": [
        {
            "name": "NORTH",
            "spaces": 6
        },
        {
            "name": "SOUTH",
            "spaces": 4
        },
        {
            "name": "EAST",
            "spaces": 4
        }
    ],
    predicted_space: 14,
    reason: "hackathon finishes at 4pm",
  },
];

const getTableName = async () => {
  return `parking_area_prediction-hack`
}

const run = async () => {
  const tableName = await getTableName()

  console.log(`table name: `, tableName)

  let putReqs = predict.map(x => ({
    PutRequest: {
      Item: x
    }
  }))
  
  const req = { 
    RequestItems: {}
  }
  req.RequestItems[tableName] = putReqs
  await dynamodb.batchWrite(req).promise()
}

run().then(() => console.log("all done")).catch(err => console.error(err.message))
