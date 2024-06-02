import express from 'express'
import router from './routes/router.js'
import path from 'path'

const __dirname = path.resolve()
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static('public'))
app.use ('/', router)

app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`))