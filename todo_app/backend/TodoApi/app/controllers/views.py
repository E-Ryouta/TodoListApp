from flask import Blueprint, jsonify
from app.services.business_logic import TodoListService
from sqlalchemy.dialects.postgresql import UUID
from app.utils.utils import model_to_dict

todo_list_service = TodoListService()
bp = Blueprint("todo_list", __name__)

@bp.route("/todo_list", methods=["GET"])
def get_todo_list():
    todo_list = todo_list_service.get_todo_list()

    aggregated_data = {}
    for task_container, tasks  in todo_list:
        task_container_dic= model_to_dict(task_container)
        task_dic = [model_to_dict(tasks)]
        
        if aggregated_data != {} and task_container_dic["task_container_id"] in aggregated_data:
            aggregated_data[task_container_dic["task_container_id"]]['tasks'].extend(task_dic)
        else:
            aggregated_data[task_container_dic["task_container_id"]] = {
                'taskContainer': task_container_dic,
                'tasks': task_dic
            }
    

    return jsonify(aggregated_data)
