from .schema.models import Tasks, TaskContainers
from .session_manager.session_manager import SessionManager
from sqlalchemy.orm import aliased
from sqlalchemy import cast, Date


class DataAccess:
    def get_all_todo_list(self, created_at):
        with SessionManager() as session:
            # サブクエリでTasksから該当の日付のデータを取得
            tasks_subquery = (
                session.query(Tasks)
                .filter(cast(Tasks.created_at, Date) == created_at)
                .subquery()
            )

            # エイリアスを作成
            TasksAlias = aliased(Tasks, tasks_subquery)

            # TaskContainersとTasksAliasを外部結合
            todo_list = (
                session.query(TaskContainers, TasksAlias)
                .outerjoin(TasksAlias, TaskContainers.task_container_id == TasksAlias.task_container_id)
                .order_by(TaskContainers.task_container_order_index)
                .all()
            )
        
        return todo_list
    
    def update_task(self, task):
        with SessionManager() as session:
            query = session.query(Tasks).filter(Tasks.task_id == task["task_id"])
            if session.query(query.exists()).scalar():
                session.query(Tasks).filter(Tasks.task_id == task["task_id"]).update(task)
            else:
                session.add(Tasks(task_id=task["task_id"], task_container_id=task["task_container_id"], task_title=task["task_title"], task_description=task["task_description"], created_at=task["created_at"]))

            session.commit()

        return task
    
    def delete_task(self, task):
        with SessionManager() as session:
            session.query(Tasks).filter(Tasks.task_id == task["task_id"]).delete()
            session.commit()

        return task
