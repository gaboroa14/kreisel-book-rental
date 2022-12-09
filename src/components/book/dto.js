import { bookCategoryResource } from '@components/bookCategory/dto'

export const bookResource = (resource) => ({
  id: resource.id,
  name: resource.name,
  authorName: resource.authorName,
  category: bookCategoryResource(resource.category),
  availability: resource.availability,
  reservations: resource.reservations,
  fare: resource.fare,
  status: resource.status ? 'Activo' : 'Inactivo'
})

export const listBooks = (resourceList) =>
  resourceList.map((r) => bookResource(r))
