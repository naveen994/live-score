const express = require('express')
const path = require('path')

// Create the server
const app = express()

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'build')))

app.post('/alphaz/post', (req, res) => {
    return res.send("Post method called")
})

app.get('/alphaz/get', (req, res) => {
    res.send("Called get method")
})

// Anything that doesn't match the above, send back the index.html file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'))
})

// Choose the port and start the server
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Mixing it up on port ${PORT}`)
})