create table "client_aircrafts" (
  id VARCHAR(255) NOT NULL PRIMARY KEY uuid_generate_v4(),
  client_id VARCHAR(255) NOT NULL,
  uas_manufacture VARCHAR(255) NOT NULL,
  uas_model VARCHAR(255) NOT NULL,
  uas_active BOOLEAN NOT NULL,
  uas_details JSONB NULL,

  created_on timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_on timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,

  created_by VARCHAR(255) NULL,
  updated_by VARCHAR(255) NULL,
  
  CONSTRAINT client_aircraft_fk
    FOREIGN KEY(client_id)
        REFERENCES "portal_clients"(id)
            ON DELETE CASCADE,
)