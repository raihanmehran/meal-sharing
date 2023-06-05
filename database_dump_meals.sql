-- Create the database
CREATE DATABASE IF NOT EXISTS meals;

-- Switch to the database
USE meals;

CREATE TABLE Meal (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  location VARCHAR(255),
  when_datetime DATETIME,
  max_reservations INT,
  price DECIMAL(10, 2),
  created_date DATE
);

CREATE TABLE Reservation (
  id INT AUTO_INCREMENT PRIMARY KEY,
  number_of_guests INT,
  meal_id INT,
  created_date DATE,
  contact_phonenumber VARCHAR(255),
  contact_name VARCHAR(255),
  contact_email VARCHAR(255),
  FOREIGN KEY (meal_id) REFERENCES Meal(id)
);



CREATE TABLE Review (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  meal_id INT,
  stars INT,
  created_date DATE,
  FOREIGN KEY (meal_id) REFERENCES Meal(id)
);


INSERT INTO Meal (title, description, location, when_datetime, max_reservations, price, created_date)
VALUES
  ('Meal 1', 'Description for Meal 1', 'Location 1', '2023-06-01 12:00:00', 5, 10.99, '2023-06-01'),
  ('Meal 2', 'Description for Meal 2', 'Location 2', '2023-06-02 18:30:00', 3, 15.50, '2023-06-02'),
  ('Meal 3', 'Description for Meal 3', 'Location 3', '2023-06-03 19:00:00', 8, 8.75, '2023-06-03'),
  ('Meal 4', 'Description for Meal 4', 'Location 4', '2023-06-04 20:15:00', 2, 12.99, '2023-06-04'),
  ('Meal 5', 'Description for Meal 5', 'Location 5', '2023-06-05 13:30:00', 6, 9.50, '2023-06-05'),
  ('Meal 6', 'Description for Meal 6', 'Location 6', '2023-06-06 17:45:00', 4, 14.25, '2023-06-06'),
  ('Meal 7', 'Description for Meal 7', 'Location 7', '2023-06-07 19:30:00', 10, 11.99, '2023-06-07'),
  ('Meal 8', 'Description for Meal 8', 'Location 8', '2023-06-08 14:00:00', 7, 7.95, '2023-06-08'),
  ('Meal 9', 'Description for Meal 9', 'Location 9', '2023-06-09 18:00:00', 3, 16.50, '2023-06-09'),
  ('Meal 10', 'Description for Meal 10', 'Location 10', '2023-06-10 19:45:00', 5, 13.75, '2023-06-10');
