import { db } from '../db';

// Function to view all employees
export const getAllEmployees = async () => {
    const [rows] = await db.query(`
        SELECT employees.id, employees.first_name, employees.last_name, roles.title AS role, departments.name AS department, roles.salary, 
               CONCAT(manager.first_name, ' ', manager.last_name) AS manager
        FROM employees
        LEFT JOIN roles ON employees.role_id = roles.id
        LEFT JOIN departments ON roles.department_id = departments.id
        LEFT JOIN employees AS manager ON employees.manager_id = manager.id
    `);
    console.table(rows);
};

// Function to add an employee
export const addEmployee = async (first_name: string, last_name: string, role_id: number, manager_id: number | null) => {
    await db.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [first_name, last_name, role_id, manager_id]);
    console.log(`Added employee: ${first_name} ${last_name}`);
};

// Function to update an employee's role
export const updateEmployeeRole = async (employee_id: number, role_id: number) => {
    await db.query('UPDATE employees SET role_id = ? WHERE id = ?', [role_id, employee_id]);
    console.log(`Updated employee ID ${employee_id}'s role`);
};
