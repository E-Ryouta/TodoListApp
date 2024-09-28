from TodoApi.app.utils.utils import object_as_dict
from ..models.data_access import DataAccess


class TodoListService:
    def __init__(self):
        self.data_access = DataAccess()

    def get_tasks(self, created_at):
        return self.data_access.get_tasks(created_at)
    
    def get_tags(self):
        return self.data_access.get_tags()
    
    def get_tasks_with_tag(self, startDate, endDate):
        task_sum_with_date, doing_todo_tasks, average_time_per_tag = self.data_access.get_tasks_with_tag(startDate, endDate)

        task_sum_with_date_list = [
            {
                "date": item.date.strftime("%Y-%m-%d"),
                "total_tasks": item.total_tasks
            }
            for item in task_sum_with_date
        ]

        doing_todo_tasks_list = [object_as_dict(task) for task in doing_todo_tasks]

        average_time_per_tag_list = [
            {
                "tag_label": item.tag_label,
                "tag_color": item.tag_color,
                "average_duration": float(item.average_duration) if item.average_duration is not None else 0.0
            }
            for item in average_time_per_tag
        ]

        task_with_tag_obj = {
            "task_sum_with_date": task_sum_with_date_list,
            "doing_todo_tasks": doing_todo_tasks_list,
            "average_time_per_tag": average_time_per_tag_list
        }
        
        return task_with_tag_obj

    def update_task(self, task):
        return self.data_access.update_task(task)
    
    def delete_task(self, task):
        self.data_access.delete_task(task)
