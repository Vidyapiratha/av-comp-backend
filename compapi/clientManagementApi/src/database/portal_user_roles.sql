create table "portal_user_roles" (
  id VARCHAR(255) NOT NULL PRIMARY KEY uuid_generate_v4(),
  role_name VARCHAR(255) NOT NULL,
  role_level INT NOT NULL,

  created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted BOOLEAN NOT NULL DEFAULT False,
  deleted_on timestamptz NULL,

  created_by_id VARCHAR(255) NULL,
  updated_by_id VARCHAR(255) NULL,
  deleted_by_id VARCHAR(255) NULL,
  
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

CREATE RULE user_roles_del_protect AS ON DELETE TO portal_user_roles DO INSTEAD NOTHING;

INSERT INTO portal_user_roles (role_name, role_level)
VALUES ('MASTER', 1),
('SUPER_ADMIN', 2),
('ADMIN', 3),
('USER', 4);