from flask import Blueprint, jsonify, request
from services.business_logic import TodoListService
from models.data_access import Database

db = Database()
todo_list_service = TodoListService(db)

bp = Blueprint('todo_list', __name__)

@bp.route('/todo_list', methods=['GET'])
def get_todo_list():
    users = todo_list_service.get_todo_list()
    return jsonify(users)

# @bp.route('/users', methods=['POST'])
# def add_user():
#     data = request.get_json()
#     name = data.get('name')
#     email = data.get('email')
#     user_service.create_user(name, email)
#     return jsonify({'message': 'User added successfully'}), 201
