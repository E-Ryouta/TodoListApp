import uuid
from datetime import datetime
from sqlalchemy import inspect

def object_as_dict(model):
    dict_obj = {}
    for column in inspect(model).mapper.column_attrs:
        value = getattr(model, column.key)
        match value:
            case datetime():  # datetime 型の場合
                dict_obj[column.key] = value.strftime("%Y-%m-%d %H:%M:%S")
            case uuid.UUID():  # UUID 型の場合
                dict_obj[column.key] = str(value)
            case _:  # それ以外の型
                dict_obj[column.key] = value
    return dict_obj