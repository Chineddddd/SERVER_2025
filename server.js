const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")
const bodyParser = require('body-parser')
// const authRouter = require('./routers/auth')
// const userRouter = require('./routers/user')
const { readdirSync } = require('fs') 
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json())

// app.use('/api',userRouter)
// app.use('/api',authRouter)
readdirSync('./routers').map((item)=> app.use('/api',require('./routers/'+item)))

app.listen(9000,()=> console.log("Hello post 9000"))