CREATE TABLE task_container (
    task_container_id UUID PRIMARY KEY,
    progress_header VARCHAR(255) NOT NULL
);

CREATE TABLE tasks (
    tasks_id UUID PRIMARY KEY,
    task_container_id UUID NOT NULL,
    task_title VARCHAR(255) NOT NULL,
    task_description TEXT
);