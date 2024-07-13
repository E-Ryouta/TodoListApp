from .schema.models import Tasks, TaskContainers
from .session_manager.session_manager import SessionManager


class DataAccess:
    def get_all_todo_list(self):
        with SessionManager() as session:
            todo_list = session.query(TaskContainers, Tasks).outerjoin(Tasks, TaskContainers.task_container_id == Tasks.task_container_id).all()

        return todo_list
