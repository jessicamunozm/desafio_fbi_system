import path from 'path'
import {results}  from '../data/agentes.js'
import jwt from 'jsonwebtoken'
import { fileURLToPath } from 'url'

process.loadEnvFile()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const key = process.env.PASSWORD

const homeController = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'))
}

const signInController = (req, res) => {
    try {
  const {email, password} = req.query
  const user = results.find((user) => { 
   return user.email === email && user.password === password
})
  let token = jwt.sign({email}, key, {expiresIn: '2m' })
  user
  ? res.send(`<body style="background-color: black">
  <h1 style="color: yellow; text-align: center; margin-top: 15%; font-family: 'arial'"> Agente autenticado, bienvenido ${email}</h1>
  <p style="color: yellow; text-align: center; font-size: 25px; font-family: 'arial'">Su token está en el sessionStorage</p>
  <a style="color: yellow; text-align: center; font-size: 20px; display: block; font-family: 'arial'" href="/dashboard?token=${token}">Ir al dashboard</a>
  <script> sessionStorage.setItem('token', JSON.stringify("${token}")) </script><body>`)
  : res.sendFile(path.join(__dirname, '../views/wrong.html'))
    } catch (error) {
        res.send(error)
    }
}

const dashboardController = (req, res) => {
    try {
        const {token} = req.query
    jwt.verify(token, key, (err, decoded) => {
        if (err) {
            res.status(401).send(`<body style="background-color: black">
            <h1 style="color: yellow; text-align: center; margin-top: 15%; font-family: 'arial'">No autorizado<h1> 
            <p style="color: yellow; text-align: center; font-size: 25px; font-family: 'arial'">${err.message} </p>
            </body>`)
        } else {
            res.sendFile(path.join(__dirname, '../views/dashboard.html'))
        }
    })
    } catch (error) {
        res.send(error)
    }
}


export {homeController, signInController, dashboardController}