create table "client_pilots" (
  id VARCHAR(255) NOT NULL PRIMARY KEY uuid_generate_v4(),
  client_id VARCHAR(255) NOT NULL,
  pilot_active BOOLEAN NOT NULL DEFAULT True,
  pilot_firstname VARCHAR(255) NOT NULL,
  pilot_lastname VARCHAR(255) NOT NULL,
  pilot_dob VARCHAR(255) NOT NULL,
  pilot_email VARCHAR(255) NOT NULL,
  pilot_jobtitle VARCHAR(255) NOT NULL,
  pilot_portal_access BOOLEAN NOT NULL DEFAULT True,
  pilot_portal_role VARCHAR(255) NOT NULL,

  pilot_created_on timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  pilot_created_by VARCHAR(255) NOT NULL,
  pilot_updated_on timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  pilot_updated_by VARCHAR(255) NOT NULL,

  pilot_notes VARCHAR(255) NULL,

  UNIQUE(pilot_email),

  ADD CONSTRAINT fk_client_id
      FOREIGN KEY(client_id)
          REFERENCES "client_pilots"(id)
              ON DELETE RESTRICT,

  CONSTRAINT fk_pilot_portal_role
    FOREIGN KEY(pilot_portal_role)
        REFERENCES "portal_user_roles"(id)
            ON DELETE RESTRICT,
  
  CONSTRAINT fk_pilot_created_by
    FOREIGN KEY(pilot_created_by)
        REFERENCES "portal_users"(id)
            ON DELETE SET NULL,

  CONSTRAINT fk_pilot_updated_by
    FOREIGN KEY(pilot_updated_by)
        REFERENCES "portal_users"(id)
            ON DELETE SET NULL
)