import mysql from 'mysql2/promise';

// This is the pool we'll use to query the database
export const db = mysql.createPool({
    host:'localhost',
    user:'postgres',
    password:'Lucklove3355',
    database:'company_db',
});

