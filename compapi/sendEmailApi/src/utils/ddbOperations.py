import boto3

# It's better to initialize resources where they are used or pass them as parameters
def get_dynamodb_table(table_name):
    dynamodb = boto3.resource('dynamodb')
    return dynamodb.Table(table_name)

def get_item(table, table_params):
    try:
        response = table.get_item(**table_params)
        print("Get data success ::: ", response)
        return response
    except Exception as exp:
        print("Exception raised while getting data ::: ", str(exp))
        raise

def put_item(table, table_params):
    try:
        response = table.put_item(**table_params)
        print("Data updated (put) in DB ::: ", response)
        return response
    except Exception as exp:
        print("Exception raised while updating (put) data ::: ", str(exp))
        raise

def query_items(table, table_params):
    try:
        response = table.query(**table_params)
        print("Data queried successfully ::: ", response)
        return response
    except Exception as exp:
        print("Exception raised while querying data ::: ", str(exp))
        raise

def update_item(table, table_params):
    try:
        response = table.update_item(**table_params)
        print("Data updated (update) in DB ::: ", response)
        return response
    except Exception as exp:
        print("Exception raised while updating (update) data ::: ", str(exp))
        raise

def delete_item(table, table_params):
    try:
        response = table.delete_item(**table_params)
        print("Data deleted from DB ::: ", response)
        return response
    except Exception as exp:
        print("Exception raised while deleting data ::: ", str(exp))
        raise