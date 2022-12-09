export const userResource = (resource) => ({
  username: resource.username,
  name: resource.name,
  birthday: resource.birthday,
  userType: resource.userType === 'C' ? 'Cliente' : 'Administrador',
  status: resource.status ? 'Activo' : 'Inactivo'
})

export const listUsers = (resources) =>
  resources.map((resource) => userResource(resource))
