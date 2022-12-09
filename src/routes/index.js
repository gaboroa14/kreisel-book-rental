import { authRouter } from '@components/auth/routes'
import { bookRouter } from '@components/book/routes'
import { bookCategoryRouter } from '@components/bookCategory/routes'
import { userRouter } from '@components/user/routes'
import { Router } from 'express'
const router = Router()

router.use('', authRouter)
router.use('/user', userRouter)
router.use('/bookCategory', bookCategoryRouter)
router.use('/book', bookRouter)

export default router
