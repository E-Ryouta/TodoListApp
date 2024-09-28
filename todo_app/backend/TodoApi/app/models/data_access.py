from .schema.models import Tasks, Tags
from .session_manager.session_manager import SessionManager
from sqlalchemy.orm import aliased
from sqlalchemy import cast, Date, func


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
            task_sum_with_date = (
                session.query(
                    cast(Tasks.created_at, Date).label("date"),
                    func.count(Tasks.task_id).label("total_tasks")
                )
                .filter(Tasks.task_container_id == "done")
                .filter(cast(Tasks.created_at, Date) >= startDate)
                .filter(cast(Tasks.created_at, Date) <= endDate)
                .group_by(cast(Tasks.created_at, Date))
                .order_by(cast(Tasks.created_at, Date))
                .all()
            )

            doing_todo_tasks = (
                session.query(Tasks)
                .filter(Tasks.task_container_id.in_(["todo", "inProgress"]))
                .filter(cast(Tasks.created_at, Date) >= startDate)
                .filter(cast(Tasks.created_at, Date) <= endDate)
                .all()
            )

            average_time_per_tag = (
                session.query(
                    Tags.tag_label,
                    Tags.tag_color,
                    func.avg(Tasks.task_timer).label("average_duration")
                )
                .join(Tasks, Tasks.tag_id == Tags.tag_id)
                .filter(cast(Tasks.created_at, Date) >= startDate)
                .filter(cast(Tasks.created_at, Date) <= endDate)
                .group_by(Tags.tag_label, Tags.tag_color)
                .order_by(Tags.tag_label)
                .all()
            )
        
        return task_sum_with_date, doing_todo_tasks, average_time_per_tag
    
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
