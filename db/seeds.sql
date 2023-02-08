USE office_db;

-- start by inserting all of the information into this setting

INSERT INTO department (name)
VALUES ('Sales'),
('Human Resources'),
('Marketing');

INSERT INTO role (title, salary, department_id)
VALUES ('VP of Sales', 88000, 1),
('Sales Representative', 56000, 1),
('Head of Human Resources', 74000, 2),
('HR Representative', 52000, 2)
('VP of Marketing', 84000, 3),
('Marketing Associate', 77000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Mack', 'Klingbeil', 1, 1),
('Leo', 'Carberry', 2, 1),
('Aaron', 'Bastin', 3, 2),
('Eric', 'Carberry', 4, 2),
('Tyler', 'Cappis', 5, 3),
('Nick', 'Beard', 6, 3);