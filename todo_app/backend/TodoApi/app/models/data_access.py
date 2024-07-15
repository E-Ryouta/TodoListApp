from .schema.models import Tasks, TaskContainers
from .session_manager.session_manager import SessionManager


class DataAccess:
    def get_all_todo_list(self):
        with SessionManager() as session:
            todo_list = session.query(TaskContainers, Tasks).outerjoin(Tasks, TaskContainers.task_container_id == Tasks.task_container_id).order_by(TaskContainers.task_container_order_index).all()
            
        return todo_list
    
    def update_task(self, task):
        with SessionManager() as session:
            query = session.query(Tasks).filter(Tasks.task_id == task["task_id"])
            if session.query(query.exists()).scalar():
                session.query(Tasks).filter(Tasks.task_id == task["task_id"]).update(task)
            else:
                session.add(Tasks(task_id=task["task_id"], task_container_id=task["task_container_id"], task_title=task["task_title"], task_description=task["task_description"]))

            session.commit()

        return task
