import { check, validationResult } from 'express-validator'
import { handleError, handleResponse } from '@middleware/errorHandlers'
import { findUserByUsername } from '../dao'
import { decodeToken } from '@services/jwt'
import { message } from '@config/message'

const message_request = message.empty
const message_request2 = message.invalid

export const validateFutureDate = (birthday) => {
  const brth = new Date(birthday)
  const today = new Date()
  if (brth > today) {
    throw new Error('La fecha de nacimiento es inválida')
  }
  return true
}

export const userRequest = async (req, res, next) => {
  try {
    const { method } = req

    if (method == 'POST') {
      await check('password', `La contraseña ${message_request}`)
        .notEmpty()
        .run(req)
      await check(
        'password',
        `La contraseña no cumple con uno de los siguientes requisitos: Un carácter en mayúscula, un carácter especial (@,.,$,*), caracteres en minúscula, un número y debe contener al menos 8 dígitos.`
      )
        .matches(/(?=.*[A-Z])(?=.*[a-z])\S{8,}$/)
        .run(req)
    }
    await check('username', `El nombre de usuario ${message_request}`)
      .notEmpty()
      .run(req)
    await check('name', `El nombre ${message_request2}`)
      .matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+( [a-zA-ZÀ-ÿ\u00f1\u00d1]+)*$/)
      .run(req)
    await check('birthday', `La fecha de nacimiento ${message_request}`)
      .notEmpty()
      .run(req)
    await check('birthday').custom(validateFutureDate).run(req)
    await check('birthday', `La fecha de nacimiento ${message_request2}`)
      .isDate({ format: 'MM-DD-YYYY' })
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

export const validateUsername = async (req, res, next) => {
  try {
    const user = await findUserByUsername(req.body.username)

    if (user) {
      return handleResponse(
        res,
        400,
        'El nombre de usuario ya se encuentra registrado',
        'El nombre de usuario ya se encuentra registrado'
      )
    }

    next()
  } catch (error) {
    return handleError(error, res)
  }
}

export const userExist = async (req, res, next) => {
  try {
    const username = req.params.username
      ? req.params.username
      : req.body.username
    const user = await findUserByUsername(username)
    if (!user) {
      return handleResponse(
        res,
        400,
        'Usuario no encontrado',
        'Usuario no encontrado'
      )
    } else {
      next()
    }
  } catch (error) {
    return handleError(error, res)
  }
}

export const userAdminRequest = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    const { userType } = req.body

    if (userType === 'A') {
      if (authorization) {
        const token = authorization.split(' ')[1]
        const decode = decodeToken(token)
        const { userType } = decode

        if (userType === 'A') {
          next()
        } else {
          return handleResponse(
            res,
            400,
            'Usuario no autorizado',
            'Usuario no autorizado'
          )
        }
      } else {
        return handleResponse(
          res,
          400,
          'Usuario no autorizado',
          'Usuario no autorizado'
        )
      }
    } else {
      next()
    }
  } catch (error) {
    return handleError(error, res)
  }
}
