const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = require('./config/connection');
const conTable = require('console.table');

require("dotenv").config();

// we want to add options here for menus
// const db = mysql.createConnection(
//     {
//       host: 'localhost',
//       user: process.env.DB_USER,
//       password: process.env.DB_PW,
//       database: process.env.DB_DB
//     },
//     console.log(`Connected to the office_db database.`)
//   );

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
        }
    })
}

function getAllDep() {
    const queryStore = `SELECT id, name AS department FROM department;`
    db.query(queryStore, (err, results) => {
        if (err) {
            console.log(err);
        } console.table(results)
        menu();
    })
}

function getAllRoles() {
    const queryStore = `SELECT role.title,role.id, deparment.name AS department, role.salary 
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