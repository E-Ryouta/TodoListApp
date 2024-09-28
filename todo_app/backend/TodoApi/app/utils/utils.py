import uuid
from datetime import datetime
from sqlalchemy import inspect
from inflection import camelize, underscore

def object_as_dict(model):
    dict_obj = {}
    for column in inspect(model).mapper.column_attrs:
        value = getattr(model, column.key)
        match value:
            case datetime():
                dict_obj[column.key] = value.strftime("%Y-%m-%d %H:%M:%S")
            case uuid.UUID():
                dict_obj[column.key] = str(value)
            case _: 
                dict_obj[column.key] = value
    return dict_obj

def to_camel_case(data):
    if isinstance(data, list):
        return [to_camel_case(item) for item in data]
    elif isinstance(data, dict):
        new_data = {}
        for key, value in data.items():
            new_key = camelize(key, False)
            if isinstance(value, (dict, list)):
                new_value = to_camel_case(value)
            else:
                new_value = value
            new_data[new_key] = new_value
        return new_data
    else:
        return data
    
def to_snake_case(data):
    if isinstance(data, list):
        return [to_snake_case(item) for item in data]
    elif isinstance(data, dict):
        new_data = {}
        for key, value in data.items():
            new_key = underscore(key)
            if isinstance(value, (dict, list)):
                new_value = to_snake_case(value)
            else:
                new_value = value
            new_data[new_key] = new_value
        return new_data
    else:
        return data