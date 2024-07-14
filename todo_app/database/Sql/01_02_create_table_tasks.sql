CREATE TABLE tasks (
    task_id UUID PRIMARY KEY NOT NULL,
    task_container_id UUID NOT NULL,
    task_title VARCHAR(255) NOT NULL,
    task_description TEXT,
    FOREIGN KEY (task_container_id) REFERENCES task_containers(task_container_id)
);