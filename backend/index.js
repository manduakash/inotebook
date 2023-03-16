const connectToMongo = require('./db')
const express = require('express')
const cors = require('cors')

connectToMongo();
const app = express()
const port = 4000

app.use(cors())
app.use(express.json());

// endpoints
app.use('/api/v1/auth', require('./routes/auth'))
app.use('/api/v1/note', require('./routes/note'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})