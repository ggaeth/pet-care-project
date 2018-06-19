CREATE DATABASE
IF NOT EXISTS petpurfect_db;

USE petpurfect_db;

CREATE TABLE IF NOT EXISTS owners
(
owner_id  INT(10)         NOT NULL AUTO_INCREMENT, 
name      VARCHAR(100)    NOT NULL, 
address   VARCHAR(30)     NOT NULL, 
city      VARCHAR(30)     NOT NULL,
state     CHAR(20)        NOT NULL,
zip_code  INT(5)          NOT NULL, 
phone     INT(11)         NOT NULL,
secondary_phone INT(11),
email     VARCHAR(255),
username  VARCHAR(20),
owner_image VARCHAR(200),
owner_info VARCHAR(1000),     
PRIMARY KEY
(owner_id)
);

CREATE TABLE IF NOT EXISTS caregivers
(
caregiver_id  INT(10)     NOT NULL AUTO_INCREMENT, 
name      VARCHAR(100)    NOT NULL, 
address   VARCHAR(30)     NOT NULL, 
city      VARCHAR(30)     NOT NULL,
state     CHAR(20)        NOT NULL,
zip_code  INT(5)          NOT NULL, 
phone     INT(11)         NOT NULL,
secondary_phone INT(11),
email     VARCHAR(255),
username  VARCHAR(20),
caregiver_image VARCHAR(200),
caregiver_info VARCHAR(1000),     
PRIMARY KEY
(caregiver_id)
);

CREATE TABLE IF NOT EXISTS pets
(
pet_id      INT(10)         NOT NULL AUTO_INCREMENT, 
name        VARCHAR(100)    NOT NULL, 
age         INT(2)          NOT NULL DEFAULT 0, 
breed       VARCHAR(30)     NOT NULL,
gender      CHAR(1)         NOT NULL,
crate       BOOLEAN         DEFAULT false, 
phone       INT(11)         NOT NULL,
vet_name    VARCHAR(100),
vet_address VARCHAR(100),
vet_phone   INT(11),
pet_image   VARCHAR(200),
pet_medications VARCHAR(1000),  
pet_restrictions VARCHAR(1000),   
PRIMARY KEY
(pet_id)
);

CREATE TABLE IF NOT EXISTS pet_todos
(
pet_id      INT(10)         NOT NULL AUTO_INCREMENT, 
name        VARCHAR(100)    NOT NULL, 
todo        VARCHAR(1000),     
PRIMARY KEY
(pet_id)
);

CREATE TABLE users_table  (
`id`         INT UNSIGNED  NOT NULL AUTO_INCREMENT, 
`username`   VARCHAR(20)   NOT NULL, 
`password`   CHAR(60)      NOT NULL, 
PRIMARY KEY 
(`id`) 
);
