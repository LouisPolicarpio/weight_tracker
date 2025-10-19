import express from 'express';
import {sql} from '../config/db.js'

export const getAllLogs = async (req, res) => {
   try {
        const logs = await sql`
            SELECT * FROM log
            ORDER BY created_at DESC 
        `;

        console.log('get all logs succeeded');
        res.status(200).json({success:true, data:logs});
    
   } catch (error) {
        console.log('get all logs failed');
        res.status(500).json({ success: false, error: error.message });   
    } 
}

export const createLog = async (req, res) => {
    const {weight, date}= req.body;
   try {
        const logs = await sql`
            INSERT INTO log (weight,created_at)
            VALUES(
                ${weight},
                COALESCE(${date},  NOW())
            )
            RETURNING *;

        `;

        console.log('create logs succeeded');
        res.status(201).json({success:true, data:logs});
    
   } catch (error) {
        console.log('create log failed');
        res.status(500).json({ success: false, error: error.message });   
    } 
  
}

export const updateLog = async (req, res) => {
    const {id} = req.params;
    const {weight, date}= req.body;
   try {
        const logs = await sql`
            UPDATE log 
            SET
                weight = COALESCE(${weight}, weight ),
                created_at = COALESCE(${date},  created_at)
            WHERE id = ${id}
            RETURNING *;
        `;

        if (logs.length === 0) {
            return res.status(404).json({ success: false, error: 'Log not found' });
        }

        console.log('update log succeeded');
        res.status(200).json({success:true, data:logs});
    
   } catch (error) {
        console.log('get all logs failed');
        res.status(500).json({ success: false, error: error.message });   
    } 
   
}