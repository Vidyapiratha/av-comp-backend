def create_response(code, message, data=None):
  return {
    "statusCode": code,
    "body": json.dumps({
      "message": message,
      "data": data,
    }),
    "headers": {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": True,
    },
  }
