from flask import Blueprint, jsonify
from ..services.business_logic import TodoListService
from ..utils.utils import model_to_obj
from flask import request
from collections import OrderedDict

todo_list_service = TodoListService()
bp = Blueprint("todo_list", __name__)

@bp.route("/todo_lists", methods=["GET"])
def get_todo_list():
    created_at = request.args.get("created_at")
    todo_list = todo_list_service.get_todo_list(created_at)

    todo_list_obj = OrderedDict(
        {
            "todo": [],
            "inProgress": [],
            "done": [],
        }
    )
    for tasks in todo_list:
        task_obj = model_to_obj(tasks)

        if (task_obj["task_container_id"] in todo_list_obj):
            todo_list_obj[task_obj["task_container_id"]].append(task_obj)

    return jsonify(todo_list_obj).json


@bp.route("/tasks", methods=["PUT"])
def put_task():
    task = request.json
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