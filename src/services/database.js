import { dataBook } from '@components/book/model'
import { dataBookCategory } from '@components/bookCategory/model'
import { dataRental } from '@components/rental/model'
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

const Book = db.define('book', dataBook)

const Rental = db.define('rental', dataRental)

//Relationships between models

BookCategory.hasMany(Book, { as: 'books' })

Book.belongsTo(BookCategory, { foreignKey: 'categoryId', as: 'category' })

Book.hasMany(Rental, { foreignKey: 'bookId', as: 'book' })

User.hasMany(Rental, { foreignKey: 'username', as: 'user' })

Rental.belongsTo(Book, { foreignKey: 'bookId' })

Rental.belongsTo(User, { foreignKey: 'username' })

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
export const BookModel = Book
export const RentalModel = Rental
