from ..models.data_access import DataAccess


class TodoListService:
    def __init__(self):
        self.data_access = DataAccess()

    def get_tasks(self, created_at):
        return self.data_access.get_tasks(created_at)
    
    def get_tags(self):
        return self.data_access.get_tags()
    
    def get_tasks_with_tag(self, startDate, endDate):
        return self.data_access.get_tasks_with_tag(startDate, endDate)

    def update_task(self, task):
        return self.data_access.update_task(task)
    
    def delete_task(self, task):
        self.data_access.delete_task(task)
