import { UserModel } from '@services/database'
import { Op } from 'sequelize'
const bcrypt = require('bcryptjs')

export const findUsers = async ({ search, limit, offset, status }) => {
  try {
    const searchField = `%${search}%`

    const condition = search
      ? {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: searchField
              }
            },
            {
              username: {
                [Op.iLike]: searchField
              }
            }
          ]
        }
      : null
    return await UserModel.findAll({
      limit: limit,
      offset: offset,
      where: {
        ...condition,
        status
      }
    })
  } catch (error) {
    throw error
  }
}

export const findUserByUsername = async (username) => {
  try {
    return await UserModel.findOne({
      where: { username }
    })
  } catch (error) {
    throw error
  }
}

export const addUser = async (username, password, name, birthday) => {
  try {
    //encripta la contraseña
    const salt = bcrypt.genSaltSync()
    password = bcrypt.hashSync(password, salt)

    const user = {
      username,
      password,
      name,
      birthday,
      userType: 'C'
    }

    const userC = await UserModel.create(user)

    return userC
  } catch (error) {
    throw error
  }
}

export const updateUser = async (uname, data) => {
  try {
    const userV = await findUserByUsername(uname)
    const { username, status, ...user } = data

    return await userV.update(user)
  } catch (error) {
    throw error
  }
}

export const updateStatusUser = async (username, status) => {
  try {
    return await UserModel.update(
      { status: status },
      {
        where: { username },
        returning: true
      }
    )
  } catch (error) {
    throw error
  }
}
