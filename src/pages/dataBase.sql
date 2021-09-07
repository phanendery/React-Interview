-- Setup

-- Assume DB = postgresql

-- Given the table:

CREATE TABLE something
(
    id uuid NOT NULL,
    name  CHARACTER VARYING(255) NOT NULL,
    email CHARACTER VARYING(255) NOT NULL,
    phone CHARACTER VARYING(255),
    birthday DATE,
    age INTEGER
);

-- create a trigger/function which will calculate the age on insert or modify given the birthday

CREATE 
    TRIGGER calculateAge 
    on something 
    AFTER INSERT, UPDATE
    AS 
    IF ( UPDATE (birthday) )
    BEGIN
    UPDATE something
    SET age = FLOOR((CAST (GetDate() AS INTEGER) - CAST(birthday AS INTEGER)) / 365.25)
    END;


