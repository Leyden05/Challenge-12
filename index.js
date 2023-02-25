const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = require('./config/connection');
const conTable = require('console.table');

require("dotenv").config();

// we want to add options here for menus

db.connect((err) => {
    if (err) throw err
    menu()
})

function menu() {
    inquirer
    .prompt([
        {
            type: "list",
            name: "options",
            message: "Where would you like to navigate to?",
            choices: [
                "view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"
            ]
        }
    ]) .then(answers => {
        if (answers.options === "view all departments") {
            getAllDep();
        } else if (answers.options === "view all roles") {
            getAllRoles();
        } else if (answers.options === "view all employees") {
            getAllEmp();
        } else if (answers.options === "add a department") {
            addDep();
        } else if (answers.options === "add a role") {
            addRole();
        } else if (answers.options === "add an employee") {
            addEmp();
        } else if (answers.options === "update an employee role") {
            updateEmpRole();
        } 
    })
}

// view all departments
function getAllDep() {
    const queryStore = `SELECT id, name AS department FROM department;`
    db.query(queryStore, (err, results) => {
        if (err) {
            console.log(err);
        } console.table(results)
        menu();
    })
}

// view all roles
function getAllRoles() {
    const queryStore = `SELECT role.title,role.id, name AS department, role.salary 
    FROM role
    JOIN department
    ON role.department_id = department.id;`
    db.query(queryStore, (err, results) => {
        if (err) {
            console.log(err)
        } console.table(results)
        menu();
    })
}

// view all employees
function getAllEmp() {
    const queryStore = `SELECT employee.id, employee.first_name, employee.last_name, role.title, name AS department, role.salary, employee.manager_id
    FROM department
    JOIN role ON department_id = department.id
    JOIN employee ON role_id = role.id;`
    db.query(queryStore, (err, results) => {
        if (err) {
            console.log(err)
        } console.table(results)
        menu();
    })
}

// add a department
const departmentArr = [];
db.query(`SELECT name FROM department;`, (err, results) => {
    err ? console.log(err) : results.forEach(obj => departmentArr.push(obj.name))    
})


function addDep() {
    inquirer
     .prompt([
    {
        type: "input",
        name: "newDepartment",
        message: "What is the name of the department?"
    }
  ])
  .then((answers) => {
    const queryStore = `INSERT INTO department (name) VALUES (?)`;
    db.query(queryStore, answers.newDepartment, (err, results) => {
        if (err) {
            console.log(err);
        }
        console.log(`Added ${answers.newDepartment} to the database!`) 
        departmentArr.push(answers.newDepartment);
        menu();
    })

    });

    }

// add a role

function addRole() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "roleTitle",
                message: "What is the name of the role?"
            },
            {
                type: "input",
                name: "roleSalary",
                message: "What is the salary of the role?"
            },
            {
                type: "list",
                name: "roleDepartment",
                message: "What department does the role belong to?",
                choices: departmentArr
            }
        ])
        .then((answers) => {
            const index = departmentArr.indexOf(answers.roleDepartment);
            const id = index + 1;
            const queryStore = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`
            db.query(queryStore, [answers.roleTitle, answers.roleSalary, id], (err, results) => {
                err ? console.log(err) : console.log(`Added ${answers.roleTitle} to the database!`) 
                roleArr.push(answers.roleTitle);
                menu();
            })
        
        })
}

// add an employee

const roleArr = [];
db.query(`SELECT * FROM role;`, (err, results) => {
    err ? console.log(err) : results.forEach(obj => roleArr.push({name: obj.title, value: obj.id}))
    
})

const managerArr = [];
db.query(`SELECT * FROM employee;`, (err, results) => {
    err ? console.log(err) : results.forEach(obj => managerArr.push({name: obj.first_name + " " + obj.last_name, value: obj.id}))
    
})
function addEmp() {
    inquirer
      .prompt([
            {
                type: "input",
                name: "firstName",
                message: "What is the employee's first name?"
            },
            {
                type: "input",
                name: "lastName",
                message: "What is the employee's last name?"
            },
            {
                type: "list",
                name: "role",
                message: "What is the employee's role?",
                choices: roleArr
            },
            {
                type: "list",
                name: "manager",
                message: "Who is the employee's manager?",
                choices: managerArr
            }
        ])
    .then((answers) => {
        // const index = roleArr.indexOf(answers.role);
        // const id = index + 1;
        // const manIndex = managerArr.indexOf(answers.manager);
        // const managerId = manIndex + 1;
        
        const queryStore = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`
        db.query(queryStore, [answers.firstName, answers.lastName, answers.role, answers.manager], (err, results) => {
            err ? console.log(err) : console.log(`Added ${answers.firstName} ${answers.lastName} to the database!`)
            menu();
        })

    })
}

// update an employee
function updateEmpRole() {
    inquirer
    .prompt([      
        {
            type: 'list', 
            name: 'employeeUpdate',
            message: "Who is the employee you want to update?",
            choices: managerArr
        },
        {
            type: 'list', 
            name: 'employeeNewRole',
            message: "What is the employee's new role?",
            choices: roleArr
        },
    ])
    .then((answers) => {
        // const newRoleIndex = roleArr.indexOf(data.employeeNewRole[0]);
        // const newRoleid = newRoleIndex + 1;
        // const employeeIndex = employeeArrTotal[0].indexOf(data.employeeUpdate[0]);
        // const employeeid = employeeIndex +1;
        db.query(`UPDATE employee SET role_id  = ? WHERE id = ? `, [answers.employeeNewRole, answers.employeeUpdate], (err, result) => {
            err ? console.log(err) : console.log(`Updated employee in the database`)
            menu();
        })
    })
}