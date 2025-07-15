const express = require('express')
const app = express()
const  { getFromDatabase, insertIntoDatabase, updateDatabase, deleteFromDatabase } = require('../database/databaseHandlers')
const { isValid } = require('./utils')

const loadOpenTo = async(req, res) => {
    try{
        const OpenTos = await getFromDatabase('OpenTo')
        return res.status(200).json({message: 'OpenTos are sent', OpenTos})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const insertOpenTo = async(req, res) => {
    try{
        const OpenToData = req.body.insert_dict
        if(!isValid(OpenToData)) return res.status(400).json({message: 'Insert the required data and ensure they are valid'})
        const insertedData = await insertIntoDatabase('OpenTo', OpenToData)
        return res.status(201).json({message: 'OpenTo inserted', insertedData})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const updateOpenTo = async(req, res) => {
    try{   
        const id = req.params.id
        const updateInformation = req.body.update_dict
        if(!isValid(id) || !isValid(updateInformation)) return res.status(400).json({message: 'Insert the required data and ensure they are valid'})
        const updatedInfo = await updateDatabase('OpenTo', id, updateInformation)
        return res.status(201).json({message: 'OpenTo was updated successfully', updatedInfo})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const deleteOpenTo = async(req, res) => {
    try{
        const id = req.params.id
        if(!isValid(id)) res.status(400).json({message: 'Insert the required data and ensure they are valid'})
        await deleteFromDatabase('OpenTo', id)
        return res.status(200).json({message: 'OpenTo was deleted successfully'})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

module.exports = {
    insertOpenTo,
    updateOpenTo,
    loadOpenTo,
    deleteOpenTo
}