#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        userId VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        userType VARCHAR(50) NOT NULL,
        createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    INSERT INTO users (userId, password, userType) VALUES
    ('admin001', '\$2b\$10\$admin@123', 'admin'),
    ('employee001', '\$2b\$10\$employee@123', 'employee')
    ON CONFLICT (userId) DO NOTHING;
EOSQL

