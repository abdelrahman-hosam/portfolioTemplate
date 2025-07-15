const { db } = require('./connector')

let tables = ['Project', 'Skill', 'Article', 'Contact', 'Resume', 'Experience', 'OpenTo']
let experience = ['Beginner', 'intermediate', 'above intermediate', 'advanced', 'expert']


const insertIntoDatabase = async(table_name, insert_dict) => {
    if(typeof table_name !== 'string' || typeof insert_dict !== 'object') throw new TypeError('insert the valid datatypes for the data')
    if(!tables.includes(table_name)) throw new Error('Table is not found')
    try{
        const insertValuesKeys = Object.keys(insert_dict)
        const insertValues = Object.values(insert_dict)
        const columns = insertValuesKeys.join(', ')
        const placeHolders = insertValues.map(() => '?').join(', ')
        const dbConnection = await db()
        await dbConnection.query(`
            INSERT INTO ${table_name}(${columns})
            VALUES (${placeHolders})
            `, insertValues)
        return {table_name, insert_dict}
    }catch(err){
        throw new Error(err.message)
    }
} 

const deleteFromDatabase = async(table_name, id) => {
    if(!tables.includes(table_name)) throw new Error('Table is not found')
    const dbConnection = await db()
    try{
        const query = `
            DELETE FROM ${table_name}
            WHERE id = ?
        `
        const [deletedInfo] = await dbConnection.query(query, [id])
        if(deletedInfo.affectedRows === 0) throw new Error('Could not delete this (more likely not found)')
        return {table_name}
    }catch(err){
        throw new Error(err.message)
    }
}

const skillsQueryWriter = (table_name, type)=> {
    if(table_name !== 'Skill') return {query: '', value: []}
    if(type !== 'Concept' && type !== 'Technical') return {query: '', value: []}
    return {
        query: `WHERE type = ?`,
        value: [type]
    }
}
const getFromDatabase = async(table_name, type = '') => {
    try{
        const { query, value } = skillsQueryWriter(table_name, type)
        const dbConnection = await db()
        const [tableColumns] = await dbConnection.query(`
            SELECT COLUMN_NAME
            FROM INFORMATION_SCHEMA.COLUMNS
            WHERE TABLE_NAME = '${table_name}' AND TABLE_SCHEMA = 'Portfolio'
            `)
        const allowedColumns = tableColumns.map(col => col.COLUMN_NAME).filter(col => col !== 'id')
        const [getInfo] = await dbConnection.query(`
            SELECT ${allowedColumns.join(', ')} 
            FROM ${table_name}
            ${query}
            `, value)
        return getInfo
    }catch(err){
        throw new Error(err.message)
    }
}

const getStillLearning = async() => {
    try{
        const dbConnection = await db()
        const [stillLearning] = await dbConnection.query(`
            SELECT name, level
            FROM Skill
            WHERE is_learning = true
            `)
        return stillLearning
    }catch(err){
        throw new Error(err.message)
    }
}

const getByExperience = async(experience_level) => {
    if(!experience.includes(experience_level)) throw new Error('This experience level is not found')
    try{
        const dbConnection = await db()
        const [skills] = await dbConnection.query(`
            SELECT name, added_at, learnt_date
            FROM Skill
            WHERE level = ?
            `, [experience_level])
        return skills
    }catch(err){
        throw new Error(err.message)
    }
}

const updateDatabase = async(table_name, id, update_dict) => {
    if(!tables.includes(table_name) || !id) throw new Error('Table or item is not found')
    try{
        const dbConnection = await db()
        let query = `
        UPDATE ${table_name}
        SET
        `
        let updatedCount = 0
        const values = []
        const setParams = Object.keys(update_dict).filter(key => typeof update_dict[key] !== 'undefined' && update_dict[key] !== null).map(key => {
            values.push(update_dict[key])
            updatedCount += 1
            return `${key} = ?`})
        if(setParams.length === 0) throw new Error('There is no values to update')
        query += setParams.join(', ') + ' WHERE id = ?'
        values.push(id)
        const [updatedField] = await dbConnection.query(query, values)
        if(updatedField.affectedRows === 0) throw new Error('could not update the database')
        return {updatedCount, update_dict}
    }catch(err){
        throw new Error(err.message)
    }
}

module.exports={insertIntoDatabase,
                deleteFromDatabase,
                getFromDatabase,
                getStillLearning, 
                getByExperience,
                updateDatabase
}