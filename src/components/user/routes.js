import {
  authLoggedUser,
  authUserAdmin,
  authUserAdminOrSelf
} from '@middleware/auth'
import { Router } from 'express'
import {
  createUser,
  getAllUsers,
  getUserByUsername,
  putStatusUser,
  putUser
} from './controller'
import {
  userAdminRequest,
  userExist,
  userRequest,
  validateUsername
} from './middleware/validator'

const router = Router()

router.get('/', authUserAdmin, getAllUsers)
router.post('/', [userRequest, validateUsername], createUser)
router.get('/:username', [authUserAdminOrSelf, userExist], getUserByUsername)
router.put('/:username', [authUserAdminOrSelf, userRequest, userExist], putUser)
router.delete('/status/:username', [authUserAdmin, userExist], putStatusUser)

export const userRouter = router
