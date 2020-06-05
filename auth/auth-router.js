const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const Users = require('../users/users-model')

router.post('/register', (req, res) => {
    let user = req.body


    const rounds = process.env.HASH_ROUNDS || 8

    const hash = bcrypt.hashSync(user.password, rounds)

    user.password = hash

    Users.add(user)
        .then(saved => {
            res.status(201).json(saved)
        })
        .catch(error => {
            res.status(500).json({ errorMesaage: error.message })
        })
})

router.post('/login', (req, res) => {
    let { username, password } = req.body
    if (username && password) {
        Users.getBy({ username })
            .first()
            .then(user => {
                user && bcrypt.compareSync(password, user.password)
                    ? (req.session.username = user.username) &
                    (req.session.loggedin = true) &
                    res.status(200).json({ message: `Welcom $)username` })
                    : res.status(401).json({ message: `invalid credentials` })
            })
            .catch(error => res.status(500).json(error.message))
    } else {
        res.status(400).json({ error: `You shall not pass` })
    }
})

router.get('/logout', (req, res) => {
    console.log(req.sessions.cookie)
    req.sessios ? res.clearCookie('Authroject', { path: '/' }) &&
        req.session.destroy(err => {
            err ? res.status(500).json({ you: `We will always be together` })
                : res.status(200).json({ message: `goodbye` })
        })
        : res.status(200).json({ message: `Hasta La vista baby` })
})

module.exports = router