import json
import uuid
import datetime
import os

from utils.createResponse import create_response
from utils.ddbOperations import put_item as put
from utils.sqsOperations import send_message
from utils.sesOperations import send_email
from utils.schema import message_schema

TABLE_NAME = os.environ.get('SQS_MESSAGE_TABLE_NAME', 'av-email-queue-dev')

def push_message(event):
  print("Requested event ::: ", event)

  try:
    body = json.loads(event['body'])

    # Step 1: Validate request body
    error = message_schema.validate(body, abort_early=False).error
    if error:
      print("Invalid request body ::: ", error)
      err = {
        'message': 'Invalid request body',
        'body': error
      }
      return create_response(422, 'Invalid request body', err)

    # Step 2: Add record in DynamoDB
    table_params = {
      'TableName': TABLE_NAME,
      'Item': {
        'messageKey': str(uuid.uuid4()),
        'messageContent': body['messageContent'],
        'messageSubject': body['messageSubject'],
        'created': datetime.datetime.now().isoformat(),
        'updated': datetime.datetime.now().isoformat()
      }
    }
    put(table_params)

    # Step 3: Push message to SQS
    recipients = ';'.join(body['recipients'])
    ses_resp = send_message(recipients, body['messageContent'], body['messageSubject'], body['attachments'])

    return create_response(200, 'Success, Messages save in db and pushed to SQS', ses_resp['envelope'])
  except Exception as error:
    print("Error ::: ", error)
    return create_response(500, 'Internal server error', error)

def send_custom_email(event):
  print("Requested event ::: ", event)

  send_email_resp = []
  try:
    for record in event.get('Records', []):
      recipients = json.loads(record['messageAttributes']['recipients']['stringValue'])
      subject = json.loads(record['messageAttributes']['subject']['stringValue'])
      print("Body ::: ", record['body'], ", Recipients ::: ", recipients, ", Subject ::: ", subject)
      if not recipients:
        print("Recipients not found")
        continue

      # Call SES to send emails
      resp = send_email(recipients, record['body'], subject)
      send_email_resp.append(resp)

    return create_response(200, 'Success, email sent', send_email_resp)
  except Exception as error:
    print("Error ::: ", error)
    return create_response(500, 'Internal server error', error)
