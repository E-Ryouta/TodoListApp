CREATE TABLE tasks (
    task_id UUID PRIMARY KEY NOT NULL,
    task_container_id VARCHAR(20) NOT NULL,
    task_title VARCHAR(255) NOT NULL,
    task_description TEXT,
    task_timer INT DEFAULT 0 NOT NULL,
    tag_id UUID,
    task_sort_order INT NOT NULL,
    created_at TIMESTAMP NOT NULL
);