const mysql2 = require('mysql2/promise')
require('dotenv').config()
const pool = mysql2.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DBNAME,
    waitForConnections: true,
    connectionLimit: 30,
    queueLimit: 0
})

let databaseConnection = null

const db = async() => {
    if(databaseConnection) return databaseConnection
    try{
        const connection = await pool.getConnection()
        databaseConnection = pool
        connection.release()
        return databaseConnection
    }catch(err){
        console.log('Could not connect')
        throw new Error(err.message, {type:'connection'})
    }
} 

module.exports = { db }