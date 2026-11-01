
MongoDB Schema

{
  "$jsonSchema": {
    "bsonType": "object",
    "required": [
      "_id",
      "department",
      "deviceName",
      "deviceType",
      "purchaseDate",
      "status",
      "user"
    ],
    "properties": {
      "_id": {
        "bsonType": "objectId"
      },
      "department": {
        "bsonType": "string"
      },
      "deviceName": {
        "bsonType": "string"
      },
      "deviceType": {
        "bsonType": "string"
      },
      "purchaseDate": {
        "bsonType": "date"
      },
      "status": {
        "bsonType": "string"
      },
      "user": {
        "bsonType": "string"
      }
    }
  }
}