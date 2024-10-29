import { db } from '../db';

export const getAllDepartments = async () => {
    const [rows] = await db.query('SELECT * FROM departments');
    console.table(rows);
};

export const addDepartment = async (name: string) => {
    await db.query('INSERT INTO departments (name) VALUES (?)', [name]);
    console.log(`Added department: ${name}`);
};
