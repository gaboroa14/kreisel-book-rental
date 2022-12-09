import { check, validationResult } from 'express-validator'
import { message } from '@config/message'
import { handleError, handleResponse } from '@middleware/errorHandlers'
import { findBookCategoryById } from '../dao'

const message_request = message.empty
const message_request2 = message.invalid

export const bookCategoryRequest = async (req, res, next) => {
  try {
    await check('name', `El nombre ${message_request}`).notEmpty().run(req)
    await check('name', `El nombre ${message_request2}`)
      .matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+( [a-zA-ZÀ-ÿ\u00f1\u00d1]+)*$/)
      .run(req)
    await check('description', `La descripción ${message_request}`)
      .notEmpty()
      .run(req)
    await check('description', `La descripción ${message_request2}`)
      .matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+( [a-zA-ZÀ-ÿ\u00f1\u00d1]+)*$/)
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

export const bookCategoryExist = async (req, res, next) => {
  try {
    const id = req.params.id ? req.params.id : req.body.categoryId
    const bookCategory = await findBookCategoryById(id)
    if (!bookCategory) {
      return handleResponse(
        res,
        400,
        'Categoría de libros no encontrada',
        'Categoría de libros no encontrada'
      )
    } else {
      next()
    }
  } catch (error) {
    return handleError(error, res)
  }
}

export const bookCategoryEmpty = async (req, res, next) => {
  try {
    //TO-DO: Finish this after coding books
    next()
  } catch (error) {
    return handleError(error, res)
  }
}
