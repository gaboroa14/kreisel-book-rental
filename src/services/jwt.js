import jwt from 'jsonwebtoken'
require('dotenv').config()

export const secretId = process.env.SECRET_ID
export const secretIdSocket = process.env.SECRET_ID_SOCKET

export const generateJWT = (user) => {
  const token = jwt.sign(
    {
      username: user.username,
      name: user.name,
      userType: user.userType
    },
    secretId,
    { expiresIn: '2d' }
  )

  return token
}

export const decodeToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, secretId)
    return decodedToken
  } catch (error) {
    throw error
  }
}
