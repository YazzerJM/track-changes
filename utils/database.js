import { Pool } from 'pg';

let conn;

if(!conn){
    conn = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'track_changes',
        password: 'root',
        port: 5432,
    });
}

export { conn };