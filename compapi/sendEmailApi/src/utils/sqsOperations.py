import boto3

sqs = boto3.client('sqs')
QUEUE_URL = os.environ['QUEUE_URL']

def send_message(recipients, message, subject):
  try:
    print(f"Message to send ::: {message} to the recipients ::: {recipients}")
    params = {
      'DelaySeconds': 2,
      'MessageAttributes': {
        'recipients': {
          'DataType': 'String',
          'StringValue': recipients
        },
        'subject': {
          'DataType': 'String',
          'StringValue': subject
        }
      },
      'MessageBody': message,
      'QueueUrl': QUEUE_URL
    }
    
    queue_res = sqs.send_message(**params)
    print("SQS response ::: ", queue_res)
    return queue_res
  except Exception as e:
    print("Error received ::: ", e)
    raise e
