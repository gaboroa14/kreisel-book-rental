import { message } from '@config/message'
import { request, response } from 'express'

import { handleError, handleResponse } from '@middleware/errorHandlers'
import {
  addBook,
  findBooks,
  findBookById,
  updateBook,
  updateStatusBook,
  findAvailableBooks,
  findAvailableBooksByCategory
} from './dao'
import { bookResource, listBooks } from './dto'
import {
  getPagination,
  getPaginationQuerys,
  getPagingData
} from '@microservices/pagination'
import { findBookCategoryById } from '@components/bookCategory/dao'

export const createBook = async (req = request, res = response) => {
  try {
    const { name, authorName, categoryId, availability, fare } = req.body

    const data = await addBook(name, authorName, categoryId, availability, fare)
    data.category = await findBookCategoryById(categoryId)
    handleResponse(res, 200, message.create_success_long, bookResource(data))
  } catch (error) {
    handleError(error, res)
  }
}

export const getAllBooks = async (req = request, res = response) => {
  try {
    const { search, page, size, status } = getPaginationQuerys(req.query)

    const { limit, offset } = getPagination(page, size)
    const result = listBooks(await findBooks({ search, limit, offset, status }))
    const data = getPagingData({ data: result, page, limit })

    handleResponse(res, 200, message.success, data)
  } catch (error) {
    handleError(error, res)
  }
}

export const getAllAvailableBooks = async (req = request, res = response) => {
  try {
    const { search, page, size, status } = getPaginationQuerys(req.query)

    const { limit, offset } = getPagination(page, size)
    const result = listBooks(
      await findAvailableBooks({ search, limit, offset, status })
    )
    const data = getPagingData({ data: result, page, limit })

    handleResponse(res, 200, message.success, data)
  } catch (error) {
    handleError(error, res)
  }
}

export const getBookById = async (req = request, res = response) => {
  try {
    const data = await findBookById(req.params.id)

    handleResponse(res, 200, message.success, bookResource(data))
  } catch (error) {
    handleError(error, res)
  }
}

export const putBook = async (req = request, res = response) => {
  try {
    const id = req.params.id
    const book = req.body

    const data = await updateBook(id, book)

    handleResponse(res, 200, message.update, bookResource(data))
  } catch (error) {
    handleError(error, res)
  }
}

export const updateBookAvailability = async (req = request, res = response) => {
  try {
    const id = req.params.id
    const availability = req.body.availability

    const book = { availability }
    const data = await updateBook(id, book)

    handleResponse(res, 200, message.update, bookResource(data))
  } catch (error) {
    handleError(error, res)
  }
}

export const updateBookFare = async (req = request, res = response) => {
  try {
    const id = req.params.id
    const fare = req.body.fare

    const book = { fare }
    const data = await updateBook(id, book)

    handleResponse(res, 200, message.update, bookResource(data))
  } catch (error) {
    handleError(error, res)
  }
}

export const putStatusBook = async (req = request, res = response) => {
  try {
    const id = req.params.id
    const status = req.body.status

    const data = await updateStatusBook(id, status)

    handleResponse(res, 200, message.success, data)
  } catch (error) {
    handleError(error, res)
  }
}

export const getBooksByCategory = async (req = request, res = response) => {
  try {
    const { page, size, status } = getPaginationQuerys(req.query)
    const categoryId = req.params.categoryId
    const { limit, offset } = getPagination(page, size)
    const result = listBooks(
      await findAvailableBooksByCategory({ categoryId, limit, offset, status })
    )
    const data = getPagingData({ data: result, page, limit })

    handleResponse(res, 200, message.success, data)
  } catch (error) {
    handleError(error, res)
  }
}
