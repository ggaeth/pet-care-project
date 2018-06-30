CREATE DATABASE
IF NOT EXISTS petpurfect_db;

USE petpurfect_db;
CREATE TABLE
IF NOT EXISTS owners
(
owner_id        INT(10)         NOT NULL AUTO_INCREMENT, 
INDEX ownerpet_idx(owner_id),
    FOREIGN KEY(owner_id),
        REFERENCES pets(owner_id),
        ON DELETE CASCADE,
name            VARCHAR(100)    NOT NULL, 
address         VARCHAR(30)     NOT NULL, 
city            VARCHAR(30)     NOT NULL,
state           CHAR(20)        NOT NULL,
zip_code        INT(5)          NOT NULL, 
phone           INT(11)         NOT NULL,
secondary_phone INT(11),
email           VARCHAR(255),
username        VARCHAR(20),
owner_info      VARCHAR(1000),
owner_image     VARCHAR(200),     
PRIMARY KEY
(owner_id)
);
