# Kreisel Book Rental

A simple NodeJS + Express app built for a book lending library.

## Running

1. Set up a PostgreSQL database, restoring the backup. To restore run:

`lzop -cd "db.sql.lzo" | psql "$DATABASE_NAME"`

2. Set the following environment variables in a .env file:

- **SECRET_ID**: JWT Secret ID. To use with the database backup, set it up to `R6m7%T2cAmOkWw0cvKDKtAle@`
- **DB_NAME**: Database name.
- **DB_USERNAME**: Database username.
- **DB_HOST**: Database host.
- **DB_PASSWORD**: Database password.

3. Install the dependencies:

`yarn`

4. To run:

`yarn dev`

## Users and roles

The database has two users set by default.

1. `johndoe` - password: `abcABC123!@#`. Admin role.
2. `janedoe` - password: `abcABC123!@#`. Client role.

The admin is allowed to use basically every single API in the app. The client can only list and read most of the data and create rentals.

## Swagger

The backend is documented through the use of Swagger. You can access it via

`localhost:4030/swagger`

There, you can see all the APIs offered by the app.

## APIs

The app offers the following APIs:

### **Auth**:

1. **POST** _login_. You can log into the app through this API. It's the same one both for client as for administrator.

### **Book**:

1. **GET** _book_. Get every single book.
2. **POST** _book_. Creates a book register in the database.
3. **GET** _book/category/{id}_. Gets every available-for-rent book from a certain category.
4. **GET** _book/category/available_. Gets **all** available books.
5. **GET** _book/{id}_. Gets detailed information of a single book.
6. **PUT** _book/{id}_. Allows you to update data from a single book.
7. **DELETE** _book/status/{id}_. Allows you to logically delete a book. **No physical elimination allowed**.
8. **PATCH** _book/availability/{id}_. Allows you to update the availability of a certain book.
9. **PATCH** _book/fare/{id}_. Allows you to update the rent fare of a book.

### **BookCategory**:

1. **GET** _bookCategory_. Get every single book category.
2. **POST** _bookCategory_. Creates a book category register in the database.
3. **GET** _bookCategory/{id}_. Gets detailed information of a single book category.
4. **PUT** _bookCategory/{id}_. Allows you to update data from a single book category.
5. **DELETE** _bookCategory/status/{id}_. Allows you to logically delete a book category. **No physical elimination allowed**.

### **Rental**

1. **GET** _rental_. Get every single book rental.
2. **POST** _rental_. Creates a book rental register in the database.
3. **GET** _rental/book/{bookId}_. Get every single book rental associated to a given book.
4. **GET** _rental/user/{username}_. Get every single book rental associated to a given user.
5. **GET** _rental/{id}_. Gets detailed information of a single book rental.
6. **DELETE** _rental/finish/{id}_. Marks a book rental as finished.

### **User**

1. **GET** _user_. Get every single user.
2. **POST** _user_. Creates a user register in the database. _You can only create a client user_.
3. **GET** _user/{username}_. Gets detailed information of a single user.
4. **PUT** _user/{username}_. Allows you to update data from a single user. **It doesn't allow you to change the password - doing so will break the user**.
5. **DELETE** _user/{username}_. Allows you to logically delete an user. **No physical elimination allowed**.

For a more detailed rundown of the APIs, check the Swagger docs.

## Technical details

The app is written using NodeJS and Express, using a layer architecture. The validations are written using middlewares. The auth system is written using JWT. It uses Sequelize as the ORM. The app was written using Visual Studio Code.
