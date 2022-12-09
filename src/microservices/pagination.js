export const getPaginationQuerys = (query) => {
  let search = query.search || ''
  let page = parseInt(query.page) || 0
  let size = parseInt(query.size) || null
  let status = query.status || true

  return { search, page, size, status }
}

export const getPagination = (page, size) => {
  const limit = size ? +size : null
  const offset = page ? page * limit : 0

  return { limit, offset }
}

export const getPagingData = ({ data = [], page, limit }) => {
  const totalItems = data.length
  const items = data
  const currentPage = page ? +page : 0
  const totalPages = Math.ceil(totalItems / limit)

  return { totalItems, items, totalPages, currentPage }
}
