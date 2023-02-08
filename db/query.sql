USE office_db;


-- all departments
SELECT id, name AS department FROM department;

-- -- all roles
SELECT role.title,role.id, name AS department, role.salary 
FROM department
JOIN role
ON department_id = department.id;

-- -- all employees
SELECT employee.id, employee.first_name, employee.last_name, role.title, name AS department, role.salary, employee.manager_id
FROM department
JOIN role ON department_id = department.id
JOIN employee ON role_id = role.id;


-- -- add department 
INSERT INTO department (name)
    VALUE (?)

-- -- add Role 
INSERT INTO role (title, salary, id)
    VALUE (?)

-- -- add employee (will need to )
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE(?, ?, ?, ?)

-- -- update employee
UPDATE employee SET role_id  = 10 WHERE id = 7;


-- salary totals by department
SELECT name, SUM(salary) AS total_department_salary
FROM role
JOIN department ON department_id = department.id
WHERE name = ? ;