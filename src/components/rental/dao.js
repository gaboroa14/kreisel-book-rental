import { findBookById } from '@components/book/dao'
import {
  BookCategoryModel,
  BookModel,
  RentalModel,
  UserModel
} from '@services/database'

export const addRental = async (username, bookId, endDate, fare, quantity) => {
  try {
    const rental = {
      username,
      bookId,
      endDate,
      quantity,
      fare
    }

    return await RentalModel.create(rental)
  } catch (error) {
    throw error
  }
}

export const findRentals = async ({ search, limit, offset, status }) => {
  try {
    const searchField = `%${search}%`

    const condition = search
      ? {
          [Op.or]: [
            {
              startDate: {
                [Op.iLike]: searchField
              }
            },
            {
              endDate: {
                [Op.iLike]: searchField
              }
            }
          ]
        }
      : null
    return await RentalModel.findAll({
      limit: limit,
      offset: offset,
      where: {
        ...condition,
        status
      },
      include: [
        {
          model: BookModel,
          as: 'book',
          include: {
            model: BookCategoryModel,
            as: 'category'
          }
        },
        {
          model: UserModel,
          as: 'user'
        }
      ]
    })
  } catch (error) {
    throw error
  }
}

export const findRentalById = async (id) => {
  try {
    return await RentalModel.findOne({
      where: { id },
      include: [
        {
          model: BookModel,
          as: 'book',
          include: {
            model: BookCategoryModel,
            as: 'category'
          }
        },
        {
          model: UserModel,
          as: 'user'
        }
      ]
    })
  } catch (error) {
    throw error
  }
}

export const findRentalsByUsername = async (username) => {
  try {
    return await RentalModel.findAll({
      where: { username },
      include: [
        {
          model: BookModel,
          as: 'book',
          include: {
            model: BookCategoryModel,
            as: 'category'
          }
        },
        {
          model: UserModel,
          as: 'user'
        }
      ]
    })
  } catch (error) {
    throw error
  }
}

export const findRentalsByBookId = async (bookId) => {
  try {
    return await RentalModel.findAll({
      where: { bookId },
      include: [
        {
          model: BookModel,
          as: 'book',
          include: {
            model: BookCategoryModel,
            as: 'category'
          }
        },
        {
          model: UserModel,
          as: 'user'
        }
      ]
    })
  } catch (error) {
    throw error
  }
}

export const updateStatusRental = async (id, status) => {
  try {
    return await RentalModel.update(
      { status },
      { where: { id }, returning: true }
    )
  } catch (error) {
    throw error
  }
}
