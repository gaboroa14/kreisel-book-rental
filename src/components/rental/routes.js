import { userExist } from '@components/user/middleware/validator'
import {
  authLoggedUser,
  authUserAdmin,
  authUserAdminOrSelf
} from '@middleware/auth'
import { Router } from 'express'
import {
  createRental,
  getAllRentals,
  getRentalById,
  getRentalsByBookId,
  getRentalsByUsername,
  finishRental
} from './controller'
import {
  bookExistsAndAvailable,
  rentalRequest,
  rentalExists,
  onlySelfRental
} from './middleware/validator'

const router = Router()

router.get('/', authUserAdmin, getAllRentals)
router.post(
  '/',
  [authUserAdminOrSelf, rentalRequest, bookExistsAndAvailable, userExist],
  createRental
)
router.get(
  '/:id',
  [authLoggedUser, onlySelfRental, rentalExists],
  getRentalById
)
router.get('/book/:bookId', authUserAdmin, getRentalsByBookId)
router.get('/user/:username', authUserAdminOrSelf, getRentalsByUsername)
router.delete('/finish/:id', [authUserAdmin, rentalExists], finishRental)

export const rentalRouter = router
