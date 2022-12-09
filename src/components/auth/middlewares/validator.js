import bcrypt from 'bcryptjs'
import { check, validationResult } from 'express-validator'
import { handleError, handleResponse } from '@middleware/errorHandlers'
import { findUserByUsername } from '@components/user/dao'
import { message } from '@config/message'

const message_request = message.empty
const message_request2 = message.invalid

export const loginRequest = async (req, res, next) => {
  await check('username', `El nombre de usuario  ${message_request}`)
    .notEmpty()
    .run(req)
  await check('password', `La contraseña  ${message_request}`)
    .notEmpty()
    .run(req)
  await check('password', `La contraseña  ${message_request2}`)
    .isLength({ min: 8 })
    .run(req)

  const request = validationResult(req)
  if (!request.isEmpty()) {
    return res.status(422).json(request)
  } else {
    return next()
  }
}

export const userValidate = async (req, res, next) => {
  const { username, password } = req.body

  const user = await findUserByUsername(username)

  if (!user) {
    return handleResponse(res, 400, 'Usuario no encontrado')
  } else {
    const valide = await bcrypt.compare(password, user.password)

    if (valide) {
      return next()
    } else {
      return handleResponse(res, 400, 'La contraseña es inválida')
    }
  }
}
