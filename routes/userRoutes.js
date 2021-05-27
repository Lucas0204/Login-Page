const express = require('express')
const router = express.Router()
const controller = require('../controllers/userController')


router.get('/', (req, res) => res.redirect('/login'))

router.get('/home', (req, res) => res.redirect('/login'))

router.get('/login', (req, res) => res.render('login', { error: false, email: null, password: null }))

router.get('/register', (req, res) => res.render('register', { error: false, name: null, email: null, password: null }))


router.post('/login', express.urlencoded({ extended: true }), controller.login)

router.post('/register', express.urlencoded({ extended: true }), controller.register)


router.use('/home:token', express.json(), controller.auth, (req, res) => res.render('home'))


module.exports = router
