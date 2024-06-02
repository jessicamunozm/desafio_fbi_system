import express from 'express'
const router = express.Router()
import { homeController, signInController, dashboardController } from '../controller/controller.js'

router.get('/', homeController)
router.get('/signIn', signInController)
router.get('/dashboard', dashboardController)

export default router