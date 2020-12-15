-- paste your PostgresSQL schema creation script here 
CREATE DATABASE IF NOT EXISTS coralogix;
USE coralogix;
CREATE TABLE sessions(
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    data json DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    ended_at TIMESTAMP 
);