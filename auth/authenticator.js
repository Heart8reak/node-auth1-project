module.exports = (req, res) => {
    if (req.session.loggedIn) {
        next()
    } else {
        res.status(401).json({ error: 'You must log in first' })
    }
}