import { bookResource } from '@components/book/dto'
import { userResource } from '@components/user/dto'

export const rentalResource = (resource) => ({
  id: resource.id,
  user: userResource(resource.user),
  book: bookResource(resource.book),
  startDate: resource.startDate,
  endDate: resource.endDate,
  quantity: resource.quantity,
  fare: resource.fare,
  cost: resource.quantity * resource.fare,
  status: resource.status ? 'Activo' : 'Inactivo'
})

export const listRentals = (resourceList) =>
  resourceList.map((r) => rentalResource(r))

export const rentalResourceOnlyId = (resource) => ({
  id: resource.id,
  username: resource.username,
  bookId: resource.bookId,
  startDate: resource.startDate,
  endDate: resource.endDate,
  quantity: resource.quantity,
  fare: resource.fare,
  cost: resource.quantity * resource.fare,
  status: resource.status ? 'Activo' : 'Inactivo'
})

export const listRentalsOnlyId = (resourceList) =>
  resourceList.map((r) => rentalResourceOnlyId(r))
