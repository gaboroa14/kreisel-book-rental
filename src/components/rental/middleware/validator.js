import { check, validationResult } from 'express-validator'
import { message } from '@config/message'
import { handleError, handleResponse } from '@middleware/errorHandlers'
import { findBookCategoryById, findRentalById } from '../dao'
import { findBookById } from '@components/book/dao'
import { decodeToken } from '@services/jwt'

const message_request = message.empty
const message_request2 = message.invalid

export const validateEndDate = (endDate) => {
  const endDateO = new Date(endDate)
  const today = new Date()
  if (endDateO > today) {
    throw new Error('La fecha de entrega del libro es inválida')
  }
  return true
}

export const rentalRequest = async (req, res, next) => {
  try {
    await check('username', `El nombre de usuario ${message_request}`)
      .notEmpty()
      .run(req)
    await check('bookId', `El ID del libro ${message_request}`)
      .notEmpty()
      .run(req)
    await check('bookId', `El ID del libro ${message_request2}`)
      .isNumeric()
      .run(req)
    await check('endDate', `La fecha de entrega ${message_request}`)
      .notEmpty()
      .run(req)
    await check('endDate', `La fecha de entrega ${message_request2}`)
      .isDate({ format: 'MM-DD-YYYY' })
      .run(req)
    await check('endDate').custom(validateEndDate).run(req)
    await check('quantity', `La cantidad ${message_request}`)
      .notEmpty()
      .run(req)
    await check('quantity', `La cantidad ${message_request2}`)
      .isNumeric()
      .run(req)

    const request = validationResult(req)
    if (!request.isEmpty()) {
      return res.status(422).json(request)
    } else {
      next()
    }
  } catch (error) {
    return handleError(error, res)
  }
}

export const bookExistsAndAvailable = async (req, res, next) => {
  try {
    const id = req.body.bookId
    const book = await findBookById(id)
    if (!book || !book.status) {
      return handleResponse(
        res,
        400,
        'Libro no encontrado',
        'Libro no encontrado'
      )
    } else if (book.reservations + req.body.quantity > book.availability) {
      return handleResponse(
        res,
        400,
        'No hay disponibilidad para alquilar el libro',
        'No hay disponibilidad para alquilar el libro'
      )
    } else {
      next()
    }
  } catch (error) {
    return handleError(error, res)
  }
}

export const rentalExists = async (req, res, next) => {
  try {
    const id = req.params.id
    const rental = await findRentalById(id)
    if (!rental || !rental.status) {
      return handleResponse(
        res,
        400,
        'Alquiler no encontrado',
        'Alquiler no encontrado'
      )
    } else {
      next()
    }
  } catch (error) {
    return handleError(error, res)
  }
}

export const onlySelfRental = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    const rental = await findRentalById(req.params.id)
    const token = authorization.split(' ')[1]
    const decode = decodeToken(token)
    const { username, userType } = decode
    if (userType === 'A' || rental.user.username === username) {
      next()
    } else {
      return handleResponse(
        res,
        400,
        message.unauthorized,
        message.unauthorized
      )
    }
  } catch (error) {
    return handleError(error, res)
  }
}
