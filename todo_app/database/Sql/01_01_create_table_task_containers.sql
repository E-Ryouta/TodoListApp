CREATE TABLE task_containers (
    task_container_id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    progress_header VARCHAR(255) NOT NULL,
    task_container_order_index INT NOT NULL
);