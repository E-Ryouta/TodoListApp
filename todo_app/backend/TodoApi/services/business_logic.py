from models.data_access import Database

class TodoListService:
    def __init__(self, db: Database):
        self.db = db

    def get_todo_list(self):
        return self.db.get_all_todo_list()

    # def create_user(self, name, email):
    #     self.db.add_user(name, email)
