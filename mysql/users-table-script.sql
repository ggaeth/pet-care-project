CREATE DATABASE
IF NOT EXISTS petpurfect_db;

USE petpurfect_db;

CREATE TABLE IF NOT EXISTS users_table  (
`id`         INT UNSIGNED  NOT NULL AUTO_INCREMENT, 
`username`   VARCHAR(20)   NOT NULL, 
`password`   CHAR(60)      NOT NULL, 
PRIMARY KEY
(`id`) 
);
