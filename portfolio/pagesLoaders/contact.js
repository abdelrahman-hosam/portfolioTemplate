const express = require('express')
const app = express()
const  { getFromDatabase, insertIntoDatabase, deleteFromDatabase } = require('../database/databaseHandlers')
const { isValid } = require('./utils')

const loadContact = async(req, res) => {
    try{
        const Contacts = await getFromDatabase('Contact')
        return res.status(200).json({message: 'Contacts are sent', Contacts})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const insertContact = async(req, res) => {
    try{
        const ContactData = req.body.insert_dict
        if(!isValid(ContactData)) return res.status(400).json({message: 'Insert the required data and ensure they are valid'})
        const insertedData = await insertIntoDatabase('Contact', ContactData)
        return res.status(201).json({message: 'Contact inserted', insertedData})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const updateContact = async(req, res) => {
    try{   
        const id = req.params.id
        const updateInformation = req.body.update_dict? req.body.update_dict:null
        if(!isValid(id) || !isValid(updateInformation)) return res.status(400).json({message: 'Insert the required data and ensure they are valid'})
        const updatedInfo = await updateDatabase('Contact', id, updateInformation)
        return res.status(201).json({message: 'Contact was updated successfully', updatedInfo})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const deleteContact = async(req, res) => {
    try{
        const id = req.params.id
        if(!isValid(id)) res.status(400).json({message: 'Insert the required data and ensure they are valid'})
        await deleteFromDatabase('Contact', id)
        return res.status(200).json({message: 'Contact was deleted successfully'})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}


module.exports = {
    insertContact,
    loadContact,
    updateContact,
    deleteContact
}