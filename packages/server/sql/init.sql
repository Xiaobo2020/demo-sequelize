DROP DATABASE IF EXISTS test_db;

CREATE DATABASE test_db;

use test_db;

DROP TABLE IF EXISTS organization;

CREATE TABLE
  organization (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(256)
  );

DROP TABLE IF EXISTS project;

CREATE TABLE
  project (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(256),
    `organization_id` INT
  );

DROP TABLE IF EXISTS user;

CREATE TABLE
  user (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `username` VARCHAR(256),
    `display_name` VARCHAR(256)
  );
