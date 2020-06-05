const server = require('./api/server')

const port = process.env.PORT || 3030

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})