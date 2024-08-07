import uuid
from datetime import datetime, date, time

def model_to_obj(model): 
    dict_obj = {}
    for column in model.__table__.columns:
        value = getattr(model, column.name)
        match value:
            case datetime():
                dict_obj[column.name] = value.strftime("%Y-%m-%d %H:%M:%S")
            case uuid.UUID():
                dict_obj[column.name] = str(value)
            case _:
                dict_obj[column.name] = value
    return dict_obj