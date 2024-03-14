create table "portal_clients" (
  id VARCHAR(255) NOT NULL PRIMARY KEY,
  company_name VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  enabled BOOLEAN NOT NULL DEFAULT False,
  payment_done BOOLEAN NOT NULL DEFAULT False,
  payment_done_at timestamptz NULL,
  address JSONB NULL,

  created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,

  created_by_id VARCHAR(255) NULL,
  updated_by_id VARCHAR(255) NULL,

  UNIQUE(company_name),
  
  CONSTRAINT fk_created_by_id
    FOREIGN KEY(created_by_id)
        REFERENCES "portal_users"(id)
            ON DELETE SET NULL,

  CONSTRAINT fk_updated_by_id
    FOREIGN KEY(updated_by_id)
        REFERENCES "portal_users"(id)
            ON DELETE SET NULL
)

CREATE RULE portal_client_del_protect AS
    ON DELETE TO public.portal_clients DO INSTEAD NOTHING;