import uuid

def model_to_dict(model): 
    dict_obj = {}
    for column in model.__table__.columns:
        value = getattr(model, column.name)
        if isinstance(value, uuid.UUID):
            dict_obj[column.name] = str(value)
        else:
            dict_obj[column.name] = value
    return dict_obj
