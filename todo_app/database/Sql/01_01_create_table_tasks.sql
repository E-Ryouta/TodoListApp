CREATE TABLE tasks (
    task_id UUID PRIMARY KEY NOT NULL,
    task_container_id VARCHAR(10) NOT NULL,
    task_title VARCHAR(255) NOT NULL,
    task_description TEXT,
    created_at TIMESTAMP NOT NULL
);