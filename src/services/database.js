import { dataBookCategory } from '@components/bookCategory/model'
import { dataUser } from '@components/user/model'
import { Sequelize } from 'sequelize'

require('dotenv').config()

// for heroku
const dbname = process.env.DB_NAME
const user = process.env.DB_USERNAME
const host = process.env.DB_HOST
const password = process.env.DB_PASSWORD

export const db = new Sequelize(
  dbname, //dbName
  user, //dbUsername
  password, //dbPassword
  {
    host: host,
    dialect: 'postgres',
    dialectOptions: {
      useUTC: false, // for reading from database
      ssl: {
        require: false,
        rejectUnauthorized: false
      }
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: false,
    timezone: '-04:00' // for writing to database
  }
)

//Tables in DB
const User = db.define('user', dataUser)

const BookCategory = db.define('bookCategory', dataBookCategory)

//Relationships between models

//User.hasMany(Client, { as: 'clients' })

//Client.belongsTo(User, { foreignKey: 'userIdNumber', as: 'user' })

//Synchronizing all models at once
export const syncModels = async () => {
  try {
    await db.sync({ alter: true })
  } catch (error) {
    console.log(error)
  }
}

export const UserModel = User
export const BookCategoryModel = BookCategory
