import { validationResult } from 'express-validator'

export const handleError = async (error, res) => {
  res.status(500).json({
    status: 'error',
    message: 'SERVER ERROR',
    error: error.toString()
  })
}

export const handleValidationResult = (req, res) => {
  const request = validationResult(req)
  if (!request.isEmpty()) return res.status(422).json(request)
}

export const handleResponse = (res, status, menssage_resp, data = {}) => {
  res.status(status).json({
    message: menssage_resp,
    data: data
  })
}
