import { Router } from 'express'
import { login } from './controller'
import { loginRequest, userValidate } from './middlewares/validator'

const router = Router()

router.post('/login', [loginRequest, userValidate], login)

export const authRouter = router
