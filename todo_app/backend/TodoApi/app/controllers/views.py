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
    tasks_model = todo_list_service.get_tasks(created_at)
            
    todo_list_obj = OrderedDict(
        {
            "todo": [],
            "inProgress": [],
            "done": [],
        }
    )
    
    tasks_dict = [object_as_dict(task) for task in tasks_model]

    for task in tasks_dict:

        if (task["task_container_id"] in todo_list_obj):
            todo_list_obj[task["task_container_id"]].append(task)

    return jsonify(todo_list_obj).json

@bp.route("/tags", methods=["GET"])
def get_tags():
    tags_model = todo_list_service.get_tags()

    tags_dict = [object_as_dict(tag) for tag in tags_model]

    return jsonify(tags_dict).json

@bp.route("/tasks-with-tag", methods=["GET"])
def get_tasks_with_tag():
    startDate = request.args.get("startDate")
    endDate = request.args.get("endDate")

    tasks_with_tag_models = todo_list_service.get_tasks_with_tag(startDate, endDate)

    task_with_tag_obj = []
    for task, tag in tasks_with_tag_models:
        task_dict = object_as_dict(task)
        tag_dict = object_as_dict(tag)
        task_with_tag_dict = {**task_dict, **tag_dict}
        task_with_tag_obj.append(task_with_tag_dict)

    return jsonify(task_with_tag_obj).json

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