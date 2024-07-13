from app.models.data_access import DataAccess


class TodoListService:
    def __init__(self):
        self.data_access = DataAccess()

    def get_todo_list(self):
        return self.data_access.get_all_todo_list()
