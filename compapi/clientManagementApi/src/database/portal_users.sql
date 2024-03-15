create table "portal_users" (
  id VARCHAR(255) NOT NULL PRIMARY KEY uuid_generate_v4(),
  email VARCHAR(255) NOT NULL,
  client_id VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT True,
  user_role_id VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,

  created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,

  created_by_id VARCHAR(255) NOT NULL,
  updated_by_id VARCHAR(255) NOT NULL,
  deleted_by_id VARCHAR(255) NULL,

  UNIQUE(email),

  ADD CONSTRAINT fk_client_id
      FOREIGN KEY(client_id)
          REFERENCES "portal_clients"(id)
              ON DELETE RESTRICT,

  CONSTRAINT fk_user_role_id
    FOREIGN KEY(user_role_id)
        REFERENCES "portal_user_roles"(id)
            ON DELETE RESTRICT,
  
  CONSTRAINT fk_created_by_id
    FOREIGN KEY(created_by_id)
        REFERENCES "portal_users"(id)
            ON DELETE SET NULL,

  CONSTRAINT fk_updated_by_id
    FOREIGN KEY(updated_by_id)
        REFERENCES "portal_users"(id)
            ON DELETE SET NULL
)