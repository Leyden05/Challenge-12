const inquirer = require('inquirer');
const mysql = require('mysq12');
const db = require('./config/connections');
const conTable = require('console.table');

// we want to add options here for menus