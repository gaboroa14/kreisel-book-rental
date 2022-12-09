import { message } from '@config/message'
import { request, response } from 'express'

import { handleError, handleResponse } from '@middleware/errorHandlers'
import {
  addBookCategory,
  findBookCategories,
  findBookCategoryById,
  updateBookCategory,
  updateStatusBookCategory
} from './dao'
import { bookCategoryResource, listBookCategories } from './dto'
import {
  getPagination,
  getPaginationQuerys,
  getPagingData
} from '@microservices/pagination'

export const createBookCategory = async (req = request, res = response) => {
  try {
    const { name, description } = req.body

    const data = await addBookCategory(name, description)

    handleResponse(
      res,
      200,
      message.create_success_long,
      bookCategoryResource(data)
    )
  } catch (error) {
    handleError(error, res)
  }
}

export const getAllBookCategories = async (req = request, res = response) => {
  try {
    const { search, page, size, status } = getPaginationQuerys(req.query)

    const { limit, offset } = getPagination(page, size)
    const result = listBookCategories(
      await findBookCategories({ search, limit, offset, status })
    )
    const data = getPagingData({ data: result, page, limit })

    handleResponse(res, 200, message.success, data)
  } catch (error) {
    handleError(error, res)
  }
}

export const getBookCategoryById = async (req = request, res = response) => {
  try {
    const data = await findBookCategoryById(req.params.id)

    handleResponse(res, 200, message.success, bookCategoryResource(data))
  } catch (error) {
    handleError(error, res)
  }
}

export const putBookCategory = async (req = request, res = response) => {
  try {
    const id = req.params.id
    const bookCategory = req.body

    const data = await updateBookCategory(id, bookCategory)

    handleResponse(res, 200, message.update, bookCategoryResource(data))
  } catch (error) {
    handleError(error, res)
  }
}

export const putStatusBookCategory = async (req = request, res = response) => {
  try {
    const id = req.params.id
    const status = req.body.status

    const data = await updateStatusBookCategory(id, status)

    handleResponse(res, 200, message.success, data)
  } catch (error) {
    handleError(error, res)
  }
}
