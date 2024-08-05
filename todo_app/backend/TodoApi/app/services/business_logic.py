from ..models.data_access import DataAccess


class TodoListService:
    def __init__(self):
        self.data_access = DataAccess()

    def get_todo_list(self, created_at):
        return self.data_access.get_date_todo_list(created_at)
    
    def update_task(self, task):
        return self.data_access.update_task(task)
    
    def delete_task(self, task):
        self.data_access.delete_task(task)
