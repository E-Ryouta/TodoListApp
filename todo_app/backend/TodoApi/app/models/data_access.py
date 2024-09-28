from .schema.models import Tasks, Tags
from .session_manager.session_manager import SessionManager
from sqlalchemy.orm import aliased
from sqlalchemy import cast, Date


class DataAccess:
    def get_tasks(self, created_at):
        with SessionManager() as session:
            tasks = (
                session.query(Tasks)
                .filter(cast(Tasks.created_at, Date) == created_at)
                .all()
            )
        
        return tasks
    
    def get_tags(self):
        with SessionManager() as session:
            tags = session.query(Tags).all()
        
        return tags
    
    def get_tasks_with_tag(self, startDate, endDate):
        with SessionManager() as session:
            tasks_with_tag = (
                session.query(Tasks, Tags)
                .join(Tags, Tasks.tag_id == Tags.tag_id)
                .filter(cast(Tasks.created_at, Date) >= startDate)
                .filter(cast(Tasks.created_at, Date) <= endDate)
                .all()
            )
        
        return tasks_with_tag
    
    def update_task(self, task):
        with SessionManager() as session:
            query = session.query(Tasks).filter(Tasks.task_id == task["task_id"])
            if session.query(query.exists()).scalar():
                session.query(Tasks).filter(Tasks.task_id == task["task_id"]).update(task)
            else:
                session.add(Tasks(
                    task_id=task["task_id"], 
                    task_container_id=task["task_container_id"], 
                    task_title=task["task_title"], 
                    task_description=task["task_description"], 
                    task_timer=task["task_timer"],
                    tag_id=task["tag_id"],
                    created_at=task["created_at"]))

            session.commit()

        return task
    
    def delete_task(self, task):
        with SessionManager() as session:
            session.query(Tasks).filter(Tasks.task_id == task["task_id"]).delete()
            session.commit()

        return task
