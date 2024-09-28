import uuid
from datetime import datetime
from sqlalchemy import inspect

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