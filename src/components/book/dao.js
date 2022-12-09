import { BookCategoryModel, BookModel, db } from '@services/database'
import { Op } from 'sequelize'

export const addBook = async (
  name,
  authorName,
  categoryId,
  availability,
  fare
) => {
  try {
    const book = {
      name,
      authorName,
      categoryId,
      availability,
      fare,
      reservations: 0
    }

    return await BookModel.create(book)
  } catch (error) {
    throw error
  }
}

export const findBooks = async ({ search, limit, offset, status }) => {
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
              authorName: {
                [Op.iLike]: searchField
              }
            }
          ]
        }
      : null
    return await BookModel.findAll({
      limit: limit,
      offset: offset,
      where: {
        ...condition,
        status
      },
      include: {
        model: BookCategoryModel,
        as: 'category'
      }
    })
  } catch (error) {
    throw error
  }
}

export const findAvailableBooks = async ({ search, limit, offset, status }) => {
  try {
    return await BookModel.findAll({
      limit: limit,
      offset: offset,
      where: {
        availability: { [Op.gt]: db.col('reservations') },
        status
      },
      include: {
        model: BookCategoryModel,
        as: 'category'
      }
    })
  } catch (error) {
    throw error
  }
}

export const findBookById = async (id) => {
  try {
    return await BookModel.findOne({
      where: { id },
      include: {
        model: BookCategoryModel,
        as: 'category'
      }
    })
  } catch (error) {
    throw error
  }
}

export const updateBook = async (uid, data) => {
  try {
    const bookU = await findBookById(uid)

    const { id, status, ...book } = data

    return await bookU.update(book)
  } catch (error) {
    throw error
  }
}

export const updateStatusBook = async (id, status) => {
  try {
    return await BookModel.update(
      { status },
      { where: { id }, returning: true }
    )
  } catch (error) {
    throw error
  }
}
