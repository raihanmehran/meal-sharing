-- Create the database
CREATE DATABASE IF NOT EXISTS meals;

-- Switch to the database
USE meals;

DROP TABLE IF EXISTS meals;

-- Create the "meals" table
CREATE TABLE IF NOT EXISTS meals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  date DATE
);

-- Insert 10 meals into the "meals" table
INSERT INTO meals (title, date) VALUES
  ('Meal 1', '2023-01-01'),
  ('Meal 2', '2023-01-02'),
  ('Meal 3', '2023-01-03'),
  ('Meal 4', '2023-01-04'),
  ('Meal 5', '2023-01-05'),
  ('Meal 6', '2023-01-06'),
  ('Meal 7', '2023-01-07'),
  ('Meal 8', '2023-01-08'),
  ('Meal 9', '2023-01-09'),
  ('Meal 10', '2023-06-11'),
  ('Meal 11', '2023-06-12'),
  ('Meal 12', '2023-06-13'),
  ('Meal 13', '2023-06-14');
