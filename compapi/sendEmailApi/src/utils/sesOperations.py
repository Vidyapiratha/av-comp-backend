import boto3
import smtplib

from botocore.exceptions import ClientError
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication

source_email = os.environ.get('SOURCE_EMAIL')  # this email is for testing purpose (If you want to send email to any user you need to make this email out of sandbox after requesting aws support)

ses = boto3.client('ses')

def send_email(recipients, message, subject, attachments=[]):
  try:
    print(f"Sending Email from - {source_email} to - {recipients} with subject - {subject}")

    msg = MIMEMultipart()
    msg['From'] = source_email
    msg['To'] = recipients
    msg['Subject'] = subject

    msg.attach(MIMEText(message, 'html'))

    for attachment in attachments:
      with open(attachment['content'], 'rb') as file:
        part = MIMEApplication(file.read())
        part.add_header('Content-Disposition', 'attachment', filename=attachment['filename'])
        msg.attach(part)

    ses.send_raw_email(
      Source=source_email,
      Destinations=[recipients],
      RawMessage={'Data': msg.as_string()}
    )

    print("Email sent successfully")
  except ClientError as e:
    print("Error while sending email:", e.response['Error']['Message'])
    raise e

def send_email_alternative(recipients, message, subject):
  try:
    print(f"Sending Email from - {source_email} to - {recipients} with subject - {subject}")

    msg = MIMEMultipart()
    msg['From'] = source_email
    msg['To'] = recipients
    msg['Subject'] = subject

    msg.attach(MIMEText(message, 'html'))

    ses.send_raw_email(
      Source=source_email,
      Destinations=[recipients],
      RawMessage={'Data': msg.as_string()}
    )

    print("Email sent successfully")
  except ClientError as e:
    print("Error while sending email:", e.response['Error']['Message'])
    raise e
