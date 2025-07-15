const express = require('express')
const app = express()
const  { getFromDatabase, insertIntoDatabase, updateDatabase, deleteFromDatabase } = require('../database/databaseHandlers')
const { isValid } = require('./utils')


const loadArticle = async(req, res) => {
    try{
        const Articles = await getFromDatabase('Article')
        return res.status(200).json({message: 'Articles are sent', Articles})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const insertArticle = async(req, res) => {
    try{
        const articleData = req.body.insert_dict
        if(!isValid(articleData)) return res.status(400).json({message: 'Insert the required data and ensure they are valid'})
        const insertedData = await insertIntoDatabase('Article', articleData)
        return res.status(201).json({message: 'Article inserted', insertedData})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const updateArticle = async(req, res) => {
    try{   
        const id = req.params.id
        const updateInformation = req.body.update_dict
        if(!isValid(id) || !isValid(updateArticle)) return res.status(400).json({message: 'Insert the required data and ensure they are valid'})
        const updatedInfo = await updateDatabase('Article', id, updateInformation)
        return res.status(201).json({message: 'Article was updated successfully', updatedInfo})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const deleteArticle = async(req, res) => {
    try{
        const id = req.params.id
        if(!isValid(id)) res.status(400).json({message: 'Insert the required data and ensure they are valid'})
        await deleteFromDatabase('Article', id)
        return res.status(200).json({message: 'Article was deleted successfully'})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

module.exports = {
    loadArticle,
    insertArticle,
    updateArticle,
    deleteArticle
}