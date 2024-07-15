from flask import Blueprint, jsonify
from ..services.business_logic import TodoListService
from ..utils.utils import model_to_dict
from flask import request
from collections import OrderedDict

todo_list_service = TodoListService()
bp = Blueprint("todo_list", __name__)

@bp.route("/todo_lists", methods=["GET"])
def get_todo_list():
    todo_list = todo_list_service.get_todo_list()

    todo_list_dic = OrderedDict()
    for task_container, tasks in todo_list:
        task_container_dic = model_to_dict(task_container)
        task_dic = [] if not tasks else [model_to_dict(tasks)]

        if (
            todo_list_dic != {}
            and task_container_dic["task_container_id"] in todo_list_dic
        ):
            todo_list_dic[task_container_dic["task_container_id"]]["tasks"].extend(
                task_dic
            )
        else:
            todo_list_dic[task_container_dic["task_container_id"]] = {
                "taskContainer": task_container_dic,
                "tasks": task_dic,
            }

    return jsonify(list(todo_list_dic.values()))


@bp.route("/tasks", methods=["PUT"])
def put_task():
    task = request.json
    print(task)
    if not task:
        return jsonify({"message": "Task not found"}), 400

    update_task = todo_list_service.update_task(task)
    return jsonify(update_task)

@bp.route("/tasks", methods=["DELETE"])
def delete_task():
    task = request.json
    if not task:
        return jsonify({"message": "Task not found"}), 400

    todo_list_service.delete_task(task)
    return jsonify({"message": "Task deleted"})