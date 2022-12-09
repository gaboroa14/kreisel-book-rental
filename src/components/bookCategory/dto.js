export const bookCategoryResource = (resource) => ({
  id: resource.id,
  name: resource.name,
  description: resource.description,
  status: resource.status
})

export const listBookCategories = (resourceList) =>
  resourceList.map((r) => bookCategoryResource(r))
