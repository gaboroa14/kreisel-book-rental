import { message } from '@config/message'
import { handleError, handleResponse } from '@middleware/errorHandlers'
import { generateJWT } from '@services/jwt'
import { findUserByUsername } from '@components/user/dao'

export const login = async (req, res) => {
  try {
    const { username } = req.body

    const user = await findUserByUsername(username)

    const token = generateJWT(user)

    const data = {
      token: token,
      username: user.username,
      name: user.name,
      userType: user.userType
    }

    handleResponse(res, 200, message.success, data)
  } catch (error) {
    handleError(error, res)
  }
}
