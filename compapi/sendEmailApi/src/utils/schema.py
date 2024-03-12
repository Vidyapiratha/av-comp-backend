import re

from pydantic import BaseModel, EmailStr
from typing import List  # Add this line

class MessageSchema(BaseModel):
  messageContent: str
  messageSubject: str
  recipients: List[EmailStr]  # Now 'List' is recognized

  class Config:
    allow_population_by_field_name = True
    schema_extra = {
      "example": {
        "messageContent": "Hello, World!",
        "messageSubject": "Test Email",
        "recipients": ["example1@example.com", "example2@example.com"]
      }
    }
