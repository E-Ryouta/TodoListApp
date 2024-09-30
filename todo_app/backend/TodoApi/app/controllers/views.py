from flask import Blueprint, jsonify
from ..services.business_logic import TodoListService
from ..utils.utils import object_as_dict, to_camel_case, to_snake_case
from flask import request

todo_list_service = TodoListService()
bp = Blueprint("todo_list", __name__)

@bp.route("/tasks", methods=["GET"])
def get_tasks():
    created_at = request.args.get("createdAt")
    todo_list_obj = todo_list_service.get_tasks(created_at)
    
    res_todo_list_obj =  to_camel_case(todo_list_obj)

    return jsonify(res_todo_list_obj).json

@bp.route("/tags", methods=["GET"])
def get_tags():
    tags_model = todo_list_service.get_tags()

    tags_dict = [object_as_dict(tag) for tag in tags_model]

    return jsonify(tags_dict).json

@bp.route("/tasks-with-tag", methods=["GET"])
def get_tasks_with_tag():
    startDate = request.args.get("startDate")
    endDate = request.args.get("endDate")

    tasks_with_tag_obj = todo_list_service.get_tasks_with_tag(startDate, endDate)
    res_tasks_with_tag_obj =  to_camel_case(tasks_with_tag_obj)

    return jsonify(res_tasks_with_tag_obj).json

@bp.route("/tasks", methods=["PUT"])
def put_task():
    task = to_snake_case(request.json)
    print("task", task )
    if not task:
        return jsonify({"message": "Task not found"}), 400

    update_task = todo_list_service.update_task(task)
    return jsonify(update_task)

@bp.route("/tasks", methods=["DELETE"])
def delete_task():
    task = to_snake_case(request.json)
    if not task:
        return jsonify({"message": "Task not found"}), 400

    todo_list_service.delete_task(task)
    return jsonify({"message": "Task deleted"})