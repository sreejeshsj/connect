import express from 'express'
import { getMessages } from '../controllers/chatController.js'
import userAuth from '../middlewares/userAuth.js'

const router = express.Router()

router.post('/message',userAuth,getMessages)

export default router