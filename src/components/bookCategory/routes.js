import { authLoggedUser, authUserAdmin } from '@middleware/auth'
import { Router } from 'express'
import {
  createBookCategory,
  getAllBookCategories,
  getBookCategoryById,
  putBookCategory,
  putStatusBookCategory
} from './controller'
import {
  bookCategoryEmpty,
  bookCategoryExist,
  bookCategoryRequest
} from './middleware/validator'

const router = Router()

router.get('/', authLoggedUser, getAllBookCategories)
router.post('/', [authUserAdmin, bookCategoryRequest], createBookCategory)
router.get('/:id', [authLoggedUser, bookCategoryExist], getBookCategoryById)
router.put('/:id', [authUserAdmin, bookCategoryExist], putBookCategory)
router.delete(
  '/status/:id',
  [authUserAdmin, bookCategoryExist, bookCategoryEmpty],
  putStatusBookCategory
)

export const bookCategoryRouter = router
