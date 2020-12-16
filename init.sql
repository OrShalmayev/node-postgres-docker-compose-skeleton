-- paste your PostgresSQL schema creation script here 
CREATE DATABASE IF NOT EXISTS coralogix;
USE coralogix;
CREATE TABLE sessions(
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    data json DEFAULT NULL,
    width VARCHAR(255),
    height VARCHAR(255),
    started_at VARCHAR(255),
    ended_at VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);