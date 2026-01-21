-- ===============================
-- PostgreSQL initialization script
-- ===============================

-- Create database
CREATE DATABASE dao_dapp;

-- Connect to the DAO database
\c dao_dapp;

-- Create tables
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    wallet_address VARCHAR(42) UNIQUE NOT NULL,
    username VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE proposals (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    created_by INT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE votes (
    id SERIAL PRIMARY KEY,
    proposal_id INT REFERENCES proposals(id),
    user_id INT REFERENCES users(id),
    vote BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(proposal_id, user_id)
);

CREATE TABLE treasury (
    id SERIAL PRIMARY KEY,
    balance NUMERIC DEFAULT 0,
    updated_at TIMESTAMP DEFAULT NOW()
);
