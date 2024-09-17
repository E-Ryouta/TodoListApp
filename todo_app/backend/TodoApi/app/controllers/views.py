from flask import Blueprint, jsonify
from ..services.business_logic import TodoListService
from ..utils.utils import object_as_dict
from flask import request
from collections import OrderedDict

todo_list_service = TodoListService()
bp = Blueprint("todo_list", __name__)

@bp.route("/tasks", methods=["GET"])
def get_tasks():
    created_at = request.args.get("created_at")
    tasks = todo_list_service.get_tasks(created_at)
            
    todo_list_obj = OrderedDict(
        {
            "todo": [],
            "inProgress": [],
            "done": [],
        }
    )

    for task, tag in tasks:
        task_dict = object_as_dict(task)
        tag_dict = object_as_dict(tag)
        task_and_tag_dict = {**task_dict, **tag_dict}

        if (task_and_tag_dict["task_container_id"] in todo_list_obj):
            todo_list_obj[task_and_tag_dict["task_container_id"]].append(task_and_tag_dict)

    return jsonify(todo_list_obj).json

@bp.route("/tags", methods=["GET"])
def get_tags():
    tags = todo_list_service.get_tags()

    tags_dict = [object_as_dict(tag) for tag in tags]

    return jsonify(tags_dict).json

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