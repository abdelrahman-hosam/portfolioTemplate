const express = require('express')
const app = express()
const  { getFromDatabase, insertIntoDatabase, getByExperience, updateDatabase, deleteFromDatabase } = require('../database/databaseHandlers')
let experience = ['Beginner', 'intermediate', 'above intermediate', 'advanced', 'expert']
const { isValid } = require('./utils')

const loadSkills = async(req, res) => {
    try{
        const skills = await getFromDatabase('Skill', 'Technical')
        return res.status(200).json({message: 'Skills are sent', skills})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const insertSkill = async(req, res) => {
    try{
        const skillsData = req.body.insert_dict
        if(!isValid(skillsData)) return res.status(400).json({message: 'Insert all the required data and ensure they are valid'})
        const skillsInserted = await insertIntoDatabase('Skill', skillsData)
        if(skillsInserted) return res.status(201).json({message: 'Skill is inserted', skill: skillsInserted})
    }catch(err){   
        res.status(500).json({message: err.message})
    }
}

const filterByExperience = async(req, res) => {
    try{
        const level = req.query.level
        if(!isValid(level))return res.status(400).json({message: 'Insert the required data and ensure they are valid'}) 
        if(!experience.includes(level)) return res.status(400).json({message: 'Not valid level'})
        const skills = await getByExperience(level)
        return res.status(200).json({message: 'Skills are sent', skills})
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

const updateSkill = async(req, res) => {
    try{   
        const id = req.params.id
        const updateInformation = req.body.update_dict
        if(!isValid(id) || !isValid(updateInformation)) return res.status(400).json({message: 'Insert the required data and ensure they are valid'})
        const updatedInfo = await updateDatabase('Skill', id, updateInformation)
        return res.status(201).json({message: 'Skill was updated successfully', updateInformation})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const deleteSkill = async(req, res) => {
    try{
        const id = req.params.id
        if(!isValid(id)) res.status(400).json({message: 'Insert the required data and ensure they are valid'})
        await deleteFromDatabase('Skill', id)
        return res.status(200).json({message: 'Skill was deleted successfully'})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

module.exports = {
    loadSkills,
    insertSkill,
    filterByExperience,
    updateSkill,
    deleteSkill
}