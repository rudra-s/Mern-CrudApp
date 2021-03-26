const express = require('express')
const port = process.env.PORT || 4000
const bodyParser = require('body-parser')
const cors = require('cors')
require('./models/db')
const user= require('./controller/user')

const app = express();
app.use(express.json())
app.use(cors())
app.use('/api/user/',user)

app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})