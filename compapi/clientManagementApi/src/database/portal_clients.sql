create table "portal_clients" (
  id VARCHAR(255) NOT NULL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  contact_name VARCHAR(255) NULL,
  contact_phone VARCHAR(255) NULL,
  contact_email VARCHAR(255) NULL,
  enabled BOOLEAN NOT NULL DEFAULT True,
  address JSONB NULL,

  created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted BOOLEAN NOT NULL DEFAULT False,
  deleted_on timestamptz NULL,

  created_by_id VARCHAR(255) NULL,
  updated_by_id VARCHAR(255) NULL,
  deleted_by_id VARCHAR(255) NULL,

  UNIQUE(username),
  
  CONSTRAINT fk_created_by_id
    FOREIGN KEY(created_by_id)
        REFERENCES "portal_users"(id)
            ON DELETE SET NULL,

  CONSTRAINT fk_updated_by_id
    FOREIGN KEY(updated_by_id)
        REFERENCES "portal_users"(id)
            ON DELETE SET NULL,
  
  CONSTRAINT fk_deleted_by_id
    FOREIGN KEY(deleted_by_id)
        REFERENCES "portal_users"(id)
            ON DELETE SET NULL
)