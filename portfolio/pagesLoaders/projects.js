const express = require('express')
const app = express()
const  { getFromDatabase, insertIntoDatabase, updateDatabase, deleteFromDatabase } = require('../database/databaseHandlers')
const { isValid } = require('./utils')

const loadProjects = async(req, res) => {
    try{
        const projects = await getFromDatabase('Project')
        return res.status(200).json({projects, message: 'Projects are sucessfully sent'})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const insertProject = async(req, res) => {
    try{
        const insert_dict = req.body.insert_dict
        if(!isValid(insert_dict)) return res.status(400).json({message: 'Insert the required data and ensure they are valid'})
        const project = await insertIntoDatabase('Project', insert_dict)
        return res.status(201).json({message: 'Project is successfully inserted', project})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const updateProject = async(req, res) => {
    try{   
        const id = req.params.id
        const updateInformation = req.body.update_dict
        if(!isValid(id) || !isValid(updateInformation)) return res.status(400).json({message: 'Insert the required data and ensure they are valid'})
        const updatedInfo = await updateDatabase('Project', id, updateInformation)
        return res.status(201).json({message: 'Project was updated successfully', updatedInfo})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const deleteProject = async(req, res) => {
    try{
        const id = req.params.id
        if(!isValid(id)) res.status(400).json({message: 'Insert the required data and ensure they are valid'})
        await deleteFromDatabase('Project', id)
        return res.status(200).json({message: 'Project was deleted successfully'})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

module.exports = {
    insertProject,
    loadProjects,
    updateProject,
    deleteProject
}