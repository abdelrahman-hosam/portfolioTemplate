const express = require('express')
const app = express()
const  { getFromDatabase, insertIntoDatabase, updateDatabase, deleteFromDatabase } = require('../database/databaseHandlers')
const { isValid } = require('./utils')

const loadResume = async(req, res) => {
    try{
        const Resumes = await getFromDatabase('Resume')
        return res.status(200).json({message: 'Resumes are sent', Resumes})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const insertResume = async(req, res) => {
    try{
        const ResumeData = req.body.insert_dict
        if(!isValid(ResumeData)) return res.status(400).json({message: 'Insert the required data and ensure they are valid'})
        const insertedData = await insertIntoDatabase('Resume', ResumeData)
        return res.status(201).json({message: 'Resume inserted', insertedData})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const updateResume = async(req, res) => {
    try{   
        const id = req.params.id
        const updateInformation = req.body.update_dict
        if(!isValid(id) || !isValid(updateInformation)) return res.status(400).json({message: 'Insert the required data and ensure they are valid'})
        const updatedInfo = await updateDatabase('Resume', id, updateInformation)
        return res.status(201).json({message: 'Resume was updated successfully', updatedInfo})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const deleteResume = async(req, res) => {
    try{
        const id = req.params.id
        if(!isValid(id)) res.status(400).json({message: 'Insert the required data and ensure they are valid'})
        await deleteFromDatabase('Resume', id)
        return res.status(200).json({message: 'Resume was deleted successfully'})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

module.exports = {
    loadResume, 
    insertResume,
    updateResume,
    deleteResume
}