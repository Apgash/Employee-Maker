-- Connect to the database
\c company_db;

-- Insert data into the departments table
INSERT INTO departments (name) VALUES
('Engineering'),
('Finance'),
('Human Resources'),
('Marketing');

-- Insert data into the roles table
INSERT INTO roles (title, salary, department_id) VALUES
('Software Engineer', 80000, 1),
('Senior Software Engineer', 100000, 1),
('Accountant', 70000, 2),
('HR Manager', 90000, 3),
('Marketing Specialist', 60000, 4);

-- Insert data into the employees table
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Robert', 'Brown', 3, NULL),
('Emily', 'Davis', 4, NULL),
('Michael', 'Wilson', 5, NULL);