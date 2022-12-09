import { message } from '@config/message'
import { decodeToken } from '@services/jwt'
import { handleError, handleResponse } from './errorHandlers'

export const authUserAdmin = async (req, res, next) => {
  try {
    const { authorization } = req.headers

    if (authorization) {
      const token = authorization.split(' ')[1]
      const decode = decodeToken(token)
      const { userType } = decode

      if (userType === 'A') {
        return next()
      } else {
        return handleResponse(res, 401, message.unauthorized)
      }
    } else {
      return handleResponse(res, 401, message.login_required)
    }
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return handleResponse(
        res,
        401,
        'El token ha expirado. Vuelve a iniciar sesión.'
      )
    }

    if (error.name === 'JsonWebTokenError') {
      return handleResponse(res, 401, 'Token de autenticación inválido.')
    }

    handleError(error, res)
  }
}

export const authUserAdminOrSelf = async (req, res, next) => {
  try {
    const { authorization } = req.headers

    if (authorization) {
      const token = authorization.split(' ')[1]
      const decode = decodeToken(token)
      const { username, userType } = decode
      if (
        userType === 'A' ||
        (userType === 'C' &&
          (username === req.params.username || username === req.body.username))
      ) {
        return next()
      } else {
        return handleResponse(res, 401, message.unauthorized)
      }
    } else {
      return handleResponse(res, 401, message.login_required)
    }
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return handleResponse(
        res,
        401,
        'El token ha expirado. Vuelve a iniciar sesión.'
      )
    }

    if (error.name === 'JsonWebTokenError') {
      return handleResponse(res, 401, 'Token de autenticación inválido.')
    }

    handleError(error, res)
  }
}

export const authLoggedUser = async (req, res, next) => {
  try {
    const { authorization } = req.headers

    if (authorization) {
      return next()
    } else {
      return handleResponse(res, 401, message.login_required)
    }
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return handleResponse(
        res,
        401,
        'El token ha expirado. Vuelve a iniciar sesión.'
      )
    }

    if (error.name === 'JsonWebTokenError') {
      return handleResponse(res, 401, 'Token de autenticación inválido.')
    }

    handleError(error, res)
  }
}
