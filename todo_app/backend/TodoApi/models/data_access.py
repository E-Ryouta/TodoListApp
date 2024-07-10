import psycopg2
from config import DATABASE_URL

class Database:
    def __init__(self):
        self.connection = psycopg2.connect(DATABASE_URL)

    def get_all_todo_list(self):
        with self.connection.cursor() as cursor:
            cursor.execute("SELECT * FROM tasks")
            rows = cursor.fetchall()
        return rows

    # def add_item(self, name, value):
    #     with self.connection.cursor() as cursor:
    #         cursor.execute("INSERT INTO items (name, value) VALUES (%s, %s)", (name, value))
    #     self.connection.commit()
