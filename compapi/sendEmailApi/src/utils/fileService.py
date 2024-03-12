import re
import base64

def is_base64(file):
  return isinstance(file, str) and "base64" in file

def get_metadata_from_base64_file(file):
  if not is_base64(file):
    raise ValueError("file must be a base64 string!")

  file_type, file_format = file.split(";")[0].split("/")

  return file_type, file_format

def generate_file_from_base64(file, file_type):
  if not is_base64(file):
    raise ValueError("file must be a base64 string!")

  pattern = f"^{file_type}/\\w+;base64,"
  file_data = re.sub(pattern, "", file)

  return base64.b64decode(file_data)

__all__ = [
  "is_base64",
  "generate_file_from_base64",
  "get_metadata_from_base64_file",
]
