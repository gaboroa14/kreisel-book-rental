import { message } from '@config/message'
import { request, response } from 'express'
import {
  getPagination,
  getPaginationQuerys,
  getPagingData
} from '@microservices/pagination'
import { handleError, handleResponse } from '@middleware/errorHandlers'
import {
  findUsers,
  addUser,
  updateStatusUser,
  updateUser,
  findUserByUsername
} from './dao'
import { listUsers, userResource } from './dto'

export const createUser = async (req = request, res = response) => {
  try {
    const { username, password, name, birthday } = req.body

    const data = await addUser(username, password, name, birthday)

    handleResponse(res, 200, message.create_success_long, userResource(data))
  } catch (error) {
    handleError(error, res)
  }
}

export const getAllUsers = async (req = request, res = response) => {
  try {
    const { search, page, size, status } = getPaginationQuerys(req.query)

    const { limit, offset } = getPagination(page, size)
    const result = listUsers(await findUsers({ search, limit, offset, status }))
    const data = getPagingData({ data: result, page, limit })

    handleResponse(res, 200, message.success, data)
  } catch (error) {
    handleError(error, res)
  }
}

export const getUserByUsername = async (req = request, res = response) => {
  try {
    const data = await findUserByUsername(req.params.username)

    handleResponse(res, 200, message.success, userResource(data))
  } catch (error) {
    handleError(error, res)
  }
}

export const putUser = async (req = request, res = response) => {
  try {
    const username = req.params.username
    const user = req.body

    const data = await updateUser(username, user)

    handleResponse(res, 200, message.update, userResource(data))
  } catch (error) {
    handleError(error, res)
  }
}

export const putStatusUser = async (req = request, res = response) => {
  try {
    const username = req.params.username
    const status = req.body.status

    const data = await updateStatusUser(username, status)

    handleResponse(res, 200, message.success, data)
  } catch (error) {
    handleError(error, res)
  }
}
