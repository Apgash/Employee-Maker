import inquirer from 'inquirer'; // Import inquirer for command-line prompts
import { Client } from 'pg'; // Import Client from pg for PostgreSQL connection

// Create a connection to the database
let client: Client;

// Function to initialize the database connection
async function initializeConnection() {
  client = new Client({
    host: 'localhost',
    user: 'postgres',
    password: 'Lucklove3355',
    database: 'company_db',
    port: 5432
  });
  await client.connect();
}

// Function to view all departments
async function viewAllDepartments() {
  const res = await client.query('SELECT id, name FROM departments');
  console.table(res.rows); // Display the result as a table
}

// Function to view all roles
async function viewAllRoles() {
  const res = await client.query(`
    SELECT roles.id, roles.title, departments.name AS department, roles.salary
    FROM roles
    JOIN departments ON roles.department_id = departments.id
  `);
  console.table(res.rows); // Display the result as a table
}

// Function to view all employees
async function viewAllEmployees() {
  const res = await client.query(`
    SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employees
    JOIN roles ON employees.role_id = roles.id
    JOIN departments ON roles.department_id = departments.id
    LEFT JOIN employees manager ON manager.id = employees.manager_id
  `);
  console.table(res.rows); // Display the result as a table
}

// Function to add a department
async function addDepartment() {
  const { name } = await inquirer.prompt({
    name: 'name',
    type: 'input',
    message: 'Enter the name of the department:'
  });
  await client.query('INSERT INTO departments (name) VALUES ($1)', [name]);
  console.log(`Added ${name} to the database`);
}

// Function to add a role
async function addRole() {
  const res = await client.query('SELECT id, name FROM departments');
  const { title, salary, department_id } = await inquirer.prompt([
    {
      name: 'title',
      type: 'input',
      message: 'Enter the name of the role:'
    },
    {
      name: 'salary',
      type: 'input',
      message: 'Enter the salary of the role:'
    },
    {
      name: 'department_id',
      type: 'list',
      message: 'Select the department for the role:',
      choices: res.rows.map((department: any) => ({
        name: department.name,
        value: department.id
      }))
    }
  ]);
  await client.query('INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
  console.log(`Added ${title} to the database`);
}

// Function to add an employee
async function addEmployee() {
  const rolesRes = await client.query('SELECT id, title FROM roles');
  const employeesRes = await client.query('SELECT id, CONCAT(first_name, \' \', last_name) AS name FROM employees');
  const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
    {
      name: 'first_name',
      type: 'input',
      message: 'Enter the first name of the employee:'
    },
    {
      name: 'last_name',
      type: 'input',
      message: 'Enter the last name of the employee:'
    },
    {
      name: 'role_id',
      type: 'list',
      message: 'Select the role for the employee:',
      choices: rolesRes.rows.map((role: any) => ({
        name: role.title,
        value: role.id
      }))
    },
    {
      name: 'manager_id',
      type: 'list',
      message: 'Select the manager for the employee:',
      choices: [{ name: 'None', value: null }].concat(employeesRes.rows.map((employee: any) => ({
        name: employee.name,
        value: employee.id
      })))
    }
  ]);
  await client.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id]);
  console.log(`Added ${first_name} ${last_name} to the database`);
}

// Function to update an employee role
async function updateEmployeeRole() {
  const employeesRes = await client.query('SELECT id, CONCAT(first_name, \' \', last_name) AS name FROM employees');
  const rolesRes = await client.query('SELECT id, title FROM roles');
  const { employee_id, role_id } = await inquirer.prompt([
    {
      name: 'employee_id',
      type: 'list',
      message: 'Select the employee to update:',
      choices: employeesRes.rows.map((employee: any) => ({
        name: employee.name,
        value: employee.id
      }))
    },
    {
      name: 'role_id',
      type: 'list',
      message: 'Select the new role for the employee:',
      choices: rolesRes.rows.map((role: any) => ({
        name: role.title,
        value: role.id
      }))
    }
  ]);
  await client.query('UPDATE employees SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
  console.log(`Updated employee's role`);
}

// Main function to prompt user and call appropriate function
async function main() {
  try {
    await initializeConnection(); // Initialize the database connection

    while (true) {
      const { action } = await inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Exit'
        ]
      });

      // Call the appropriate function based on user action
      switch (action) {
        case 'View all departments':
          await viewAllDepartments();
          break;
        case 'View all roles':
          await viewAllRoles();
          break;
        case 'View all employees':
          await viewAllEmployees();
          break;
        case 'Add a department':
          await addDepartment();
          break;
        case 'Add a role':
          await addRole();
          break;
        case 'Add an employee':
          await addEmployee();
          break;
        case 'Update an employee role':
          await updateEmployeeRole();
          break;
        case 'Exit':
          console.log('Goodbye!');
          await client.end(); // Close the database connection
          process.exit(0); // Exit the process
      }
    }
  } catch (error) {
    console.error('Error connecting to the database:', error); // Handle connection errors
  }
}

main(); // Start the application