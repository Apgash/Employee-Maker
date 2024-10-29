import mysql from 'mysql2/promise';

export const db = mysql.createPool({
    host:'localhost',
    user:'postgres',
    password:'Lucklove3355',
    database:'company_db',
});

