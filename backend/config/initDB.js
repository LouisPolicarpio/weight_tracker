import {sql} from './db.js';    

export async function initDB() {
    try {
        await sql`
            SET TIMEZONE TO 'UTC';
        `
        await sql`
            SHOW timezone ;
        `
        await sql`
            CREATE TABLE IF NOT EXISTS  log(
                id SERIAL PRIMARY KEY, 
                weight FLOAT,
                created_at DATE DEFAULT CURRENT_DATE            
                );
        `;

        await sql`
            CREATE TABLE IF NOT EXISTS diet_plan (
                id SERIAL PRIMARY KEY,
                name VARCHAR(50) NOT NULL,
                start_weight FLOAT,
                end_weight FLOAT,
                start_date DATE,
                end_date DATE,
                created_at DATE DEFAULT CURRENT_DATE
            );
        `;

        
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}


