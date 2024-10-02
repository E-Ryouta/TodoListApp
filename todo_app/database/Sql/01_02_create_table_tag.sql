CREATE TABLE tags (
    tag_id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    tag_label VARCHAR(255) NOT NULL,
    tag_color VARCHAR(7) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT DATE_TRUNC('second', NOW())
);