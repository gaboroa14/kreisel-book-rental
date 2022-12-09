import { message } from '@config/message'
import { request, response } from 'express'

import { handleError, handleResponse } from '@middleware/errorHandlers'
import {
  addRental,
  findRentals,
  findRentalById,
  findRentalsByUsername,
  findRentalsByBookId,
  updateStatusRental
} from './dao'
import { rentalResource, listRentals, rentalResourceOnlyId } from './dto'
import {
  getPagination,
  getPaginationQuerys,
  getPagingData
} from '@microservices/pagination'
import { findBookById, updateBookReservations } from '@components/book/dao'

export const createRental = async (req = request, res = response) => {
  try {
    const { username, bookId, endDate, quantity } = req.body
    const book = await findBookById(bookId)
    const data = await addRental(username, bookId, endDate, book.fare, quantity)
    await updateBookReservations(bookId, quantity)
    handleResponse(
      res,
      200,
      message.create_success_long,
      rentalResourceOnlyId(data)
    )
  } catch (error) {
    handleError(error, res)
  }
}

export const getAllRentals = async (req = request, res = response) => {
  try {
    const { search, page, size, status } = getPaginationQuerys(req.query)

    const { limit, offset } = getPagination(page, size)
    const result = listRentals(
      await findRentals({ search, limit, offset, status })
    )
    const data = getPagingData({ data: result, page, limit })

    handleResponse(res, 200, message.success, data)
  } catch (error) {
    handleError(error, res)
  }
}

export const getRentalById = async (req = request, res = response) => {
  try {
    const data = await findRentalById(req.params.id)

    handleResponse(res, 200, message.success, rentalResource(data))
  } catch (error) {
    handleError(error, res)
  }
}

export const getRentalsByUsername = async (req = request, res = response) => {
  try {
    const data = await findRentalsByUsername(req.params.username)

    handleResponse(res, 200, message.success, listRentals(data))
  } catch (error) {
    handleError(error, res)
  }
}

export const getRentalsByBookId = async (req = request, res = response) => {
  try {
    const data = await findRentalsByBookId(req.params.bookId)

    handleResponse(res, 200, message.success, listRentals(data))
  } catch (error) {
    handleError(error, res)
  }
}

export const finishRental = async (req = request, res = response) => {
  try {
    const id = req.params.id
    const rental = await findRentalById(id)
    if (rental.status === 'A') {
      await updateBookReservations(rental.book.id, -rental.quantity)
      await updateStatusRental(rental.id, 'F')
      handleResponse(res, 200, message.success, 'Alquiler finalizado con éxito')
    } else {
      handleResponse(
        res,
        200,
        message.success,
        'El alquiler ya ha sido finalizado'
      )
    }
  } catch (error) {
    handleError(error, res)
  }
}
