import inquirer from 'inquirer';
import mysql from 'mysql2/promise';
import { printTable } from 'console-table-printer';
import { QueryResult } from 'departments_db';

function handleQueryResult(result: QueryResult) {
    if (Array.isArray(result.rows)) {
        const rows: any[] = result.rows;
        processRows(rows);
    } else {
        console.error('Expected result.rows to be an array');
    }
}

function processRows(rows: any[]) {
    rows.forEach(row => {
        console.log(row);
    });
}

// Database connection
const db = await mysql.createConnection({
  host: 'localhost',
  user: 'postgres',
  password: 'Lucklove3355',
  database: 'departments_db',
});

async function mainMenu() {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Add Department',
        'Add Role',
        'Add Employee',
        'Update Employee Role',
        'Exit',
      ],
    },
  ]);

  switch (action) {
    case 'View All Departments':
      const departments = await viewAllDepartments();
      if (Array.isArray(departments)) {
        departments.forEach(department => {
          console.log(department);
        });
      } else {
        console.error('Expected departments to be an array');
      }
      break;
    case 'View All Roles':
      await viewAllRoles();
      break;
    case 'View All Employees':
      await viewAllEmployees();
      break;
    case 'Add Department':
      await addDepartment();
      break;
    case 'Add Role':
      await addRole();
      break;
    case 'Add Employee':
      await addEmployee();
      break;
    case 'Update Employee Role':
      await updateEmployeeRole();
      break;
    case 'Exit':
      await db.end();
      return;
  }

  mainMenu(); // Return to the main menu after completing an action
}

async function viewAllDepartments() {
  const [rows] = await db.query('SELECT id AS Department_ID, name AS Department FROM departments');
  printTable(rows);
}

async function viewAllRoles() {
  const [rows] = await db.query(`
    SELECT roles.id AS Role_ID, roles.title AS Job_Title, departments.name AS Department, roles.salary AS Salary
    FROM roles
    JOIN departments ON roles.department_id = departments.id
  `);
  printTable(rows);
}

async function viewAllEmployees() {
  const [rows] = await db.query(`
    SELECT employees.id AS Employee_ID, employees.first_name AS First_Name, employees.last_name AS Last_Name, 
           roles.title AS Job_Title, departments.name AS Department, roles.salary AS Salary, 
           managers.first_name AS Manager
    FROM employees
    LEFT JOIN roles ON employees.role_id = roles.id
    LEFT JOIN departments ON roles.department_id = departments.id
    LEFT JOIN employees AS managers ON employees.manager_id = managers.id
  `);
  printTable(rows);
}

async function addDepartment() {
  const { name } = await inquirer.prompt([
    { type: 'input', name: 'name', message: 'Enter the department name:' },
  ]);
  await db.query('INSERT INTO departments (name) VALUES (?)', [name]);
  console.log(`Department '${name}' added successfully.`);
}

async function addRole() {
  const departments = await db.query('SELECT id, name FROM departments');
  const { title, salary, departmentId } = await inquirer.prompt([
    { type: 'input', name: 'title', message: 'Enter the role title:' },
    { type: 'input', name: 'salary', message: 'Enter the role salary:' },
    {
      type: 'list',
      name: 'departmentId',
      message: 'Select a department for this role:',
      choices: departments[0].map((dept: any) => ({ name: dept.name, value: dept.id })),
    },
  ]);
  await db.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)', [
    title,
    salary,
    departmentId,
  ]);
  console.log(`Role '${title}' added successfully.`);
}

async function addEmployee() {
  const roles = await db.query('SELECT id, title FROM roles');
  const employees = await db.query('SELECT id, first_name, last_name FROM employees');
  const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
    { type: 'input', name: 'firstName', message: 'Enter the employee first name:' },
    { type: 'input', name: 'lastName', message: 'Enter the employee last name:' },
    {
      type: 'list',
      name: 'roleId',
      message: 'Select a role for this employee:',
      choices: roles[0].map((role: any) => ({ name: role.title, value: role.id })),
    },
    {
      type: 'list',
      name: 'managerId',
      message: 'Select a manager for this employee:',
      choices: [{ name: 'None', value: null }].concat(
        employees[0].map((emp: any) => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }))
      ),
    },
  ]);
  await db.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [
    firstName,
    lastName,
    roleId,
    managerId,
  ]);
  console.log(`Employee '${firstName} ${lastName}' added successfully.`);
}

async function updateEmployeeRole() {
  const employees = await db.query('SELECT id, first_name, last_name FROM employees');
  const roles = await db.query('SELECT id, title FROM roles');
  const { employeeId, roleId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'employeeId',
      message: 'Select an employee to update:',
      choices: employees[0].map((emp: any) => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id })),
    },
    {
      type: 'list',
      name: 'roleId',
      message: 'Select the new role:',
      choices: roles[0].map((role: any) => ({ name: role.title, value: role.id })),
    },
  ]);
  await db.query('UPDATE employees SET role_id = ? WHERE id = ?', [roleId, employeeId]);
  console.log('Employee role updated successfully.');
}

mainMenu();
