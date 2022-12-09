import { bookCategoryExist } from '@components/bookCategory/middleware/validator'
import { authLoggedUser, authUserAdmin } from '@middleware/auth'
import { Router } from 'express'
import {
  createBook,
  getAllAvailableBooks,
  getAllBooks,
  getBookById,
  getBooksByCategory,
  putBook,
  putStatusBook,
  updateBookAvailability,
  updateBookFare
} from './controller'
import { bookExist, bookRequest } from './middleware/validator'

const router = Router()

router.get('/', authLoggedUser, getAllBooks)
router.get('/available', authLoggedUser, getAllAvailableBooks)
router.get('/category/:categoryId', authLoggedUser, getBooksByCategory)
router.post('/', [authUserAdmin, bookRequest, bookCategoryExist], createBook)
router.get('/:id', [authLoggedUser, bookExist], getBookById)
router.put('/:id', [authUserAdmin, bookExist], putBook)
router.delete('/status/:id', [authUserAdmin, bookExist], putStatusBook)
router.patch(
  '/availability/:id',
  [authUserAdmin, bookExist],
  updateBookAvailability
)
router.patch('/fare/:id', [authUserAdmin, bookExist], updateBookFare)

export const bookRouter = router
