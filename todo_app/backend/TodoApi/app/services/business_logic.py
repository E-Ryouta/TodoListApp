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
        tasks_with_tag_models = self.data_access.get_tasks_with_tag(startDate, endDate)

        task_with_tag_obj = []
        for task, tag in tasks_with_tag_models:
            task_dict = object_as_dict(task)
            tag_dict = object_as_dict(tag)
            task_with_tag_dict = {**task_dict, **tag_dict}
            task_with_tag_obj.append(task_with_tag_dict)
        
        return task_with_tag_obj

    def update_task(self, task):
        return self.data_access.update_task(task)
    
    def delete_task(self, task):
        self.data_access.delete_task(task)
