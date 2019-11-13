const { REGION, STAGE } = process.env

const AWS = require('aws-sdk')
AWS.config.region = 'eu-west-1'
const dynamodb = new AWS.DynamoDB.DocumentClient()

let predict = [

  {"name":"morriston","time":"2019-11-14T06:00:00","parking_area":[{"name":"WEST","spaces":23},{"name":"NORTH","spaces":25},{"name":"SOUTH","spaces":28}],"predicted_space":0,"reason":null,"confidence":80},
  
  {"name":"morriston","time":"2019-11-14T06:30:00","parking_area":[{"name":"WEST","spaces":20},{"name":"NORTH","spaces":21},{"name":"SOUTH","spaces":25}],"predicted_space":0,"reason":null,"confidence":70},
  
  {"name":"morriston","time":"2019-11-14T07:00:00","parking_area":[{"name":"WEST","spaces":21},{"name":"NORTH","spaces":18},{"name":"SOUTH","spaces":20}],"predicted_space":0,"reason":null,"confidence":66},
  
  {"name":"morriston","time":"2019-11-14T07:30:00","parking_area":[{"name":"WEST","spaces":18},{"name":"NORTH","spaces":14},{"name":"SOUTH","spaces":12}],"predicted_space":0,"reason":null,"confidence":76},
  
  {"name":"morriston","time":"2019-11-14T08:00:00","parking_area":[{"name":"WEST","spaces":8},{"name":"NORTH","spaces":7},{"name":"SOUTH","spaces":6}],"predicted_space":0,"reason":"Reception is open","confidence":75},
  
  {"name":"morriston","time":"2019-11-14T08:30:00","parking_area":[{"name":"WEST","spaces":3},{"name":"NORTH","spaces":1},{"name":"SOUTH","spaces":4}],"predicted_space":0,"reason":"Reception is open","confidence":80},
  
  {"name":"morriston","time":"2019-11-14T09:00:00","parking_area":[{"name":"WEST","spaces":0},{"name":"NORTH","spaces":0},{"name":"SOUTH","spaces":0}],"predicted_space":0,"reason":"Enterprise architect's circus","confidence":90},
  
  {"name":"morriston","time":"2019-11-14T09:30:00","parking_area":[{"name":"WEST","spaces":0},{"name":"NORTH","spaces":0},{"name":"SOUTH","spaces":0}],"predicted_space":0,"reason":"Mandatory event sourcing community practice","confidence":90},
  
  {"name":"morriston","time":"2019-11-14T010:00:00","parking_area":[{"name":"WEST","spaces":0},{"name":"NORTH","spaces":1},{"name":"SOUTH","spaces":1}],"predicted_space":0,"reason":"Mandatory event sourcing community practice","confidence":90},
  
  {"name":"morriston","time":"2019-11-14T010:30:00","parking_area":[{"name":"WEST","spaces":0},{"name":"NORTH","spaces":0},{"name":"SOUTH","spaces":0}],"predicted_space":0,"reason":"Everyone is coming to see tom collins's hair cut","confidence":75},
  
  {"name":"morriston","time":"2019-11-14T011:00:00","parking_area":[{"name":"WEST","spaces":1},{"name":"NORTH","spaces":2},{"name":"SOUTH","spaces":3}],"predicted_space":0,"reason":null,"confidence":90},
  
  {"name":"morriston","time":"2019-11-14T011:30:00","parking_area":[{"name":"WEST","spaces":2},{"name":"NORTH","spaces":2},{"name":"SOUTH","spaces":3}],"predicted_space":0,"reason":null,"confidence":90},
  
  {"name":"morriston","time":"2019-11-14T012:00:00","parking_area":[{"name":"WEST","spaces":1},{"name":"NORTH","spaces":4},{"name":"SOUTH","spaces":1}],"predicted_space":0,"reason":null,"confidence":70},
  
  {"name":"morriston","time":"2019-11-14T012:30:00","parking_area":[{"name":"WEST","spaces":2},{"name":"NORTH","spaces":1},{"name":"SOUTH","spaces":2}],"predicted_space":0,"reason":null,"confidence":70},
  
  {"name":"morriston","time":"2019-11-14T013:00:00","parking_area":[{"name":"WEST","spaces":1},{"name":"NORTH","spaces":2},{"name":"SOUTH","spaces":3}],"predicted_space":0,"reason":"Engineering community event","confidence":75},
  
  {"name":"morriston","time":"2019-11-14T013:30:00","parking_area":[{"name":"WEST","spaces":1},{"name":"NORTH","spaces":1},{"name":"SOUTH","spaces":2}],"predicted_space":0,"reason":"Engineering community event","confidence":85},
  
  {"name":"morriston","time":"2019-11-14T014:00:00","parking_area":[{"name":"WEST","spaces":1},{"name":"NORTH","spaces":2},{"name":"SOUTH","spaces":1}],"predicted_space":0,"reason":null,"confidence":80},
  
  {"name":"morriston","time":"2019-11-14T014:30:00","parking_area":[{"name":"WEST","spaces":2},{"name":"NORTH","spaces":1},{"name":"SOUTH","spaces":2}],"predicted_space":0,"reason":null,"confidence":75}
  
  ]
  
  ;

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
