const express = require('express')
const app = express()
const  { getFromDatabase, insertIntoDatabase, updateDatabase, deleteFromDatabase } = require('../database/databaseHandlers')
const { isValid } = require('./utils')

const loadExperience = async(req, res) => {
    try{
        const experiences = await getFromDatabase('Experience')
        return res.status(200).json({message: 'Experiences are sent', experiences})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const insertExperience = async(req, res) => {
    try{
        const experienceData = req.body.insert_dict
        if(!isValid(experienceData)) return res.status(400).json({message: 'Insert the required data and ensure they are valid'})
        const insertedData = await insertIntoDatabase('Experience', experienceData)
        return res.status(201).json({message: 'Experience inserted', insertedData})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const updateExperience = async(req, res) => {
    try{   
        const id = req.params.id
        const updateInformation = req.body.update_dict
        if(!isValid(id) || !isValid(updateInformation)) return res.status(400).json({message: 'Insert the required data and ensure they are valid'})
        const updatedInfo = await updateDatabase('Experience', id, updateInformation)
        return res.status(201).json({message: 'Experience was updated successfully', updatedInfo})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const deleteExperience = async(req, res) => {
    try{
        const id = req.params.id
        if(!isValid(id)) res.status(400).json({message: 'Insert the required data and ensure they are valid'})
        await deleteFromDatabase('Experience', id)
        return res.status(200).json({message: 'Experience was deleted successfully'})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

module.exports = {
    loadExperience,
    insertExperience,
    updateExperience,
    deleteExperience
}