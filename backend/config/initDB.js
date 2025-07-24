import {sql} from './db.js';    

export async function initDB() {
    try {
        // Example query to create a table
        await sql`
            CREATE TABLE IF NOT EXISTS schedule (
                id SERIAL PRIMARY KEY,
                numberOfWeeks INT NOT NULL,
                startDate DATE NOT NULL,
                rate INT NOT NULL,
                startWeight INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS  Week(
                id SERIAL PRIMARY KEY,
                weekNumber INT NOT NULL,
                scheduleId INT REFERENCES schedule(id) ON DELETE CASCADE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS  Day(
                id SERIAL PRIMARY KEY, 
                actualWeight INT NOT NULL,
                week_id INT REFERENCES Week(id) ON DELETE CASCADE,
                week_day TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

        `;
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}


