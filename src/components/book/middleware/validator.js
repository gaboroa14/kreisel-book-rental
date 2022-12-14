import { check, validationResult } from 'express-validator'
import { message } from '@config/message'
import { handleError, handleResponse } from '@middleware/errorHandlers'
import { findBookById } from '../dao'

const message_request = message.empty
const message_request2 = message.invalid

export const bookRequest = async (req, res, next) => {
  try {
    await check('name', `El nombre ${message_request}`).notEmpty().run(req)
    await check('authorName', `El nombre del autor ${message_request}`)
      .notEmpty()
      .run(req)
    await check('categoryId', `La categoría del libro ${message_request}`)
      .notEmpty()
      .run(req)
    await check('categoryId', `La categoría del libro ${message_request2}`)
      .isNumeric()
      .run(req)
    await check('availability', `La disponibilidad ${message_request}`)
      .notEmpty()
      .run(req)
    await check('availability', `La disponibilidad ${message_request2}`)
      .isNumeric()
      .run(req)
    await check('fare', `El precio ${message_request}`).notEmpty().run(req)
    await check('fare', `El precio ${message_request2}`).isNumeric().run(req)

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

export const bookExist = async (req, res, next) => {
  try {
    const book = await findBookById(req.params.id)
    if (!book) {
      return handleResponse(
        res,
        400,
        'Libro no encontrado',
        'Libro no encontrado'
      )
    } else {
      next()
    }
  } catch (error) {
    return handleError(error, res)
  }
}
