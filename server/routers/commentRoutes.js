import express from 'express'
import userAuth from '../middlewares/userAuth.js'
import { addComment } from '../controllers/commentController.js'

const router = express.Router()

router.post('/comment/:postId',userAuth,addComment)

export default router