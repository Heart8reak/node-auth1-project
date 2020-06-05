const express = require('express')
const router = express.Router()
const Users = require('./users-model')

router.get('/', (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json(err.message)
            console.log({ message: `You are not logged in`, err })
        })
})

module.exports = router 