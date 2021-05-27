const User = require('../models/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validateRegister, validateLogin } = require('./validate')


const controller = {

    register: async (req, res) => {

        const currentEmail = await User.findOne({ email: req.body.email })

        if (currentEmail) {
            return res.status(400).render('register', { 
                error: true, 
                errorMessage: 'Essa conta já existe! Cadastre um novo email ou faça login.', 
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
        }

        const { error } = validateRegister(req.body)

        if (error) return res.status(400).render('register', {
            error: true,
            errorMessage: error.message,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })


        const salt = bcrypt.genSaltSync(14)

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, salt)
        })

        try {
            let savedUser = await user.save()
            res.redirect('/login')
        } catch (error) {
            res.status(400).render('register', { 
                error: true, 
                errorMessage: error.message,
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
        }

    },

    login: async (req, res) => {

        const { error } = validateLogin(req.body)

        if (error) return res.status(400).send(error.message)
        
        const currentUser = await User.findOne({ email: req.body.email })

        if (!currentUser) {
            return res.status(400).render('login', { 
                error: true, 
                errorMessage: 'Email ou senha incorreta. Tente novamente!', 
                email: req.body.email, 
                password: req.body.password 
            })
        }

        const passwordMatch = bcrypt.compareSync(req.body.password, currentUser.password)

        if (!passwordMatch) {
            return res.status(400).render('login', { 
                error: true, 
                errorMessage: 'Email ou senha incorreta. Tente novamente!', 
                email: req.body.email, 
                password: req.body.password 
            })
        }

        const token = jwt.sign({ id: currentUser._id }, process.env.JWT_SECRET)

        res.redirect(`/home:${token}`)

    },

    auth: (req, res, next) => {

        const token = req.params.token

        if (!token) {
            return res.render('login', { 
                error: true, 
                errorMessage: 'Invalid token! Please, enter your account to access this page.',
                email: null,
                password: null
            })
        }

        try {
            const valid = jwt.verify(token.slice(1, token.length), process.env.JWT_SECRET)
        } catch (error) {
            req.params.token = ''
            return res.render('login', { 
                error: true, 
                errorMessage: 'Invalid token! Please, enter your account to access this page.', 
                email: null, 
                password: null 
            })
        }
        
        next()
    }
}

module.exports = controller
