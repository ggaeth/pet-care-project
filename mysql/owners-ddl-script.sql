CREATE DATABASE
IF NOT EXISTS g2f267ekm9ozc9sv;

USE g2f267ekm9ozc9sv;
CREATE TABLE
IF NOT EXISTS owners
(
owner_id        INT(10)         NOT NULL AUTO_INCREMENT, 
name            VARCHAR(100)    NOT NULL, 
address         VARCHAR(30)     NOT NULL, 
city            VARCHAR(30)     NOT NULL,
state           CHAR(20)        NOT NULL,
zip_code        INT(5)          NOT NULL, 
phone           INT(11)         NOT NULL,
secondary_phone INT(11),
email           VARCHAR(255),
username        VARCHAR(20),
owner_image     VARCHAR(200),
owner_info      VARCHAR(1000),
createdAt TIMESTAMP NOT NULL,     
PRIMARY KEY
(owner_id)
);
