-- Connect to the departments_db database
\c departments_db;

-- Insert data into the department table
INSERT INTO department (name) VALUES
('Engineering'),
('Human Resources'),
('Marketing'),
('Sales');

-- Insert data into the role table
INSERT INTO role (title, salary, department_id) VALUES
('Software Engineer', 80000.00, 1),
('HR Manager', 60000.00, 2),
('Marketing Specialist', 50000.00, 3),
('Sales Representative', 45000.00, 4);

-- Insert data into the employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, NULL),
('Emily', 'Jones', 3, NULL),
('Michael', 'Brown', 4, NULL),
('Sarah', 'Davis', 1, 1),
('David', 'Wilson', 2, 2),
('Laura', 'Taylor', 3, 3),
('James', 'Anderson', 4, 4);


--SELECT * FROM department;
--SELECT * FROM role;
--SELECT * FROM employee;