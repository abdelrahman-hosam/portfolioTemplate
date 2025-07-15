//مَّا يَفْتَحِ اللَّهُ لِلنَّاسِ مِن رَّحْمَةٍ فَلَا مُمْسِكَ لَهَا ۖ وَمَا يُمْسِكْ فَلَا مُرْسِلَ لَهُ مِنۢ بَعْدِهِ ۚ وَهُوَ الْعَزِيزُ الْحَكِيمُ
const express = require('express')
const app = express()
const router = express.Router()
const http = require('http')
const helmet = require('helmet')

const { loadArticle, updateArticle, insertArticle, deleteArticle } = require('./pagesLoaders/articles')
const { loadConcepts, updateConcept, insertConcept, deleteConcept } = require('./pagesLoaders/concepts')
const { loadContact, updateContact, insertContact, deleteContact } = require('./pagesLoaders/contact')
const { loadExperience, updateExperience, insertExperience, deleteExperience } = require('./pagesLoaders/experience')
const { loadOpenTo, updateOpenTo, insertOpenTo, deleteOpenTo } = require('./pagesLoaders/openTo')
const { loadProjects, updateProject, insertProject, deleteProject } = require('./pagesLoaders/projects')
const { loadResume, updateResume, insertResume, deleteResume } = require('./pagesLoaders/resume')
const { loadSkills, updateSkill, insertSkill, filterByExperience, deleteSkill} = require('./pagesLoaders/Skills')

const PORT = process.env.PORT || 8000

const server = http.createServer(app)

//middleware
app.use(express.json())
app.use(helmet())
app.use('/api', router)

//API endpoints
router.post('/portfolio/article', insertArticle)
router.get('/portfolio/article', loadArticle)
router.patch('/portfolio/article/:id', updateArticle)
router.delete('/portfolio/article/:id', deleteArticle)

router.post('/portfolio/concept', insertConcept)
router.get('/portfolio/concept', loadConcepts)
router.patch('/portfolio/concept/:id', updateConcept)
router.delete('/portfolio/concept/:id', deleteConcept)

router.post('/portfolio/contact/insert', insertContact)
router.get('/portfolio/contact', loadContact)
router.patch('/portfolio/contact/:id', updateContact)
router.delete('/portfolio/contact/:id', deleteContact)

router.post('/portfolio/experience', insertExperience)
router.get('/portfolio/experience', loadExperience)
router.patch('/portfolio/experience/:id', updateExperience)
router.delete('/portfolio/experience/:id', deleteExperience)

router.post('/portfolio/openTo', insertOpenTo)
router.get('/portfolio/openTo', loadOpenTo)
router.patch('/portfolio/openTo/:id', updateOpenTo)
router.delete('/portfolio/openTo/:id', deleteOpenTo)

router.post('/portfolio/project', insertProject)
router.get('/portfolio/project', loadProjects)
router.patch('/portfolio/project/:id', updateProject)
router.delete('/portfolio/project/:id', deleteProject)

router.post('/portfolio/resume', insertResume)
router.get('/portfolio/resume', loadResume)
router.patch('/portfolio/resume/:id', updateResume)
router.delete('/portfolio/resume/:id', deleteResume)

router.post('/portfolio/skill', insertSkill)
router.get('/portfolio/skill/experience', filterByExperience)
router.get('/portfolio/skill', loadSkills)
router.patch('/portfolio/skill/:id', updateSkill)
router.delete('/portfolio/skill/:id', deleteSkill)

server.listen(PORT, ()=> (console.log(`Server is running on port ${PORT}`)))