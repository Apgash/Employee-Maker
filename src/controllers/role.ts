import { db } from '../db';

// Function to view all roles
export const getAllRoles = async () => {
    const [rows] = await db.query(`
        SELECT roles.id, roles.title, roles.salary, departments.name AS department
        FROM roles
        JOIN departments ON roles.department_id = departments.id
    `);
    console.table(rows);
};

// Function to add a role
export const addRole = async (title: string, salary: number, department_id: number) => {
    await db.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, department_id]);
    console.log(`Added role: ${title}`);
};
