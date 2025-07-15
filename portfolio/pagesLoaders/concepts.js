const express = require('express')
const app = express()
const  { getFromDatabase, insertIntoDatabase, updateDatabase, deleteFromDatabase } = require('../database/databaseHandlers')
const { isValid } = require('./utils')

const insertConcept = async(req,res) => {
    try{
        const conceptInfo = req.body.insert_dict
        if(!isValid(conceptInfo)) return res.status(400).json({message: 'Insert the required data and ensure they are valid'}) 
        const conceptInserted = await insertIntoDatabase('Skill', conceptInfo)
        return res.status(201).json({message: 'Concept inserted', concept: conceptInserted})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const loadConcepts = async(req,res) => {
    try{
        const concepts = await getFromDatabase('Skill', 'Concept')
        return res.status(200).json({message: 'Concepts are sent', concepts})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const updateConcept = async(req, res) => {
    try{   
        const id = req.params.id
        const updateInformation = req.body.update_dict
        if(!isValid(id) || !isValid(updateInformation)) return res.status(400).json({message: 'Insert the required data and ensure they are valid'})
        const updatedInfo = await updateDatabase('Concept', id, updateInformation)
        return res.status(201).json({message: 'Concept was updated successfully', updatedInfo})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const deleteConcept = async(req, res) => {
    try{
        const id = req.params.id
        if(!isValid(id)) res.status(400).json({message: 'Insert the required data and ensure they are valid'})
        await deleteFromDatabase('Concept', id)
        return res.status(200).json({message: 'Concept was deleted successfully'})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

module.exports = {
    insertConcept,
    loadConcepts,
    updateConcept,
    deleteConcept
}