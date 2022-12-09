import { BookCategoryModel } from '@services/database'

export const addBookCategory = async (name, description) => {
  try {
    const bookCategory = {
      name,
      description
    }

    return await BookCategoryModel.create(bookCategory)
  } catch (error) {
    throw error
  }
}

export const findBookCategories = async ({ search, limit, offset, status }) => {
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
              description: {
                [Op.iLike]: searchField
              }
            }
          ]
        }
      : null
    return await BookCategoryModel.findAll({
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

export const findBookCategoryById = async (id) => {
  try {
    return await BookCategoryModel.findOne({
      where: { id }
    })
  } catch (error) {
    throw error
  }
}

export const updateBookCategory = async (uid, data) => {
  try {
    const bookC = await findBookCategoryById(uid)

    const { id, status, ...bookCategory } = data

    return await bookC.update(bookCategory)
  } catch (error) {
    throw error
  }
}

export const updateStatusBookCategory = async (id, status) => {
  try {
    return await BookCategoryModel.update(
      { status },
      { where: { id }, returning: true }
    )
  } catch (error) {
    throw error
  }
}
